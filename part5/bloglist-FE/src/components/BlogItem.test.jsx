import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogItem from './BlogItem'
import { vi } from 'vitest'

test('renders blog title and author without url', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 0,
    user: {
      id: '123',
      username: 'testuser',
    },
  }

  render(
    <BlogItem blog={blog} blogList={[]} setBlogs={() => {}} setMsg={() => {}} />
  )

  const titleElement = screen.getByText(/Test Blog/i)
  const authorElement = screen.getByText(/Test Author/i)
  const urlElement = screen.queryByText(/http:\/\/testurl.com/i)

  expect(titleElement).toBeInTheDocument()
  expect(authorElement).toBeInTheDocument()
  expect(urlElement).not.toBeInTheDocument()
})

test('renders url and likes when view button is clicked', async () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    user: {
      id: '123',
      username: 'testuser',
    },
  }

  render(
    <BlogItem blog={blog} blogList={[]} setBlogs={() => {}} setMsg={() => {}} />
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText('View')
  await user.click(viewButton)

  const urlElement = screen.getByText(/http:\/\/testurl.com/i)
  const likesElement = screen.getByText(/Likes: 5/i)

  expect(urlElement).toBeInTheDocument()
  expect(likesElement).toBeInTheDocument()
})

test('like button handler is called twice when clicked twice', async () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    user: {
      id: '123',
      username: 'testuser',
    },
  }

  const mockUpdateBlog = vi.fn()

  render(
    <BlogItem
      blog={blog}
      blogList={[]}
      setBlogs={() => {}}
      setMsg={() => {}}
      handleLikeCountUpdate={mockUpdateBlog}
    />
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText('View')
  await user.click(viewButton)
  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockUpdateBlog).toHaveBeenCalledTimes(2)
})
