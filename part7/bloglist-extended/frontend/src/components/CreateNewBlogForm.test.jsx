import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateNewBlogForm from './CreateNewBlogForm'
import { vi } from 'vitest'
import { useBlogResource } from '../hooks'

vi.mock('../hooks', () => ({
  useBlogResource: vi.fn(),
}))

describe('CreateNewBlogForm', () => {
  test('calls handleSubmit with right details when form is submitted', async () => {
    const user = userEvent.setup()
    const createBlog = vi.fn()

    useBlogResource.mockReturnValue([{}, { create: createBlog }])

    render(<CreateNewBlogForm />)

    const titleInput = screen.getByLabelText(/title:/i)
    const authorInput = screen.getByLabelText(/author:/i)
    const urlInput = screen.getByLabelText(/url:/i)
    const submitButton = screen.getByRole('button', { name: /create/i })

    await user.type(titleInput, 'Test Blog Title')
    await user.type(authorInput, 'Test Author')
    await user.type(urlInput, 'https://testblog.com')

    await user.click(submitButton)

    expect(createBlog).toHaveBeenCalledTimes(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
      title: 'Test Blog Title',
      author: 'Test Author',
      url: 'https://testblog.com',
    })
  })
})
