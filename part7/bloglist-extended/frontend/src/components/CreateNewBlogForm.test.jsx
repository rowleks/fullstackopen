import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateNewBlogForm from './CreateNewBlogForm'
import { vi } from 'vitest'

describe('CreateNewBlogForm', () => {
  test('calls handleSubmit with right details when form is submitted', async () => {
    const user = userEvent.setup()
    const mockHandleSubmit = vi.fn(e => e.preventDefault())
    const mockSetFormInput = vi.fn()
    const formInput = {
      title: 'Test Blog Title',
      author: 'Test Author',
      url: 'https://testblog.com',
    }

    render(
      <CreateNewBlogForm
        handleSubmit={mockHandleSubmit}
        setFormInput={mockSetFormInput}
        formInput={formInput}
      />
    )

    const submitButton = screen.getByRole('button', { name: /create/i })
    await user.click(submitButton)

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1)

    const submitEvent = mockHandleSubmit.mock.calls[0][0]
    expect(submitEvent.target.elements.title.value).toBe('Test Blog Title')
    expect(submitEvent.target.elements.author.value).toBe('Test Author')
    expect(submitEvent.target.elements.url.value).toBe('https://testblog.com')
  })
})
