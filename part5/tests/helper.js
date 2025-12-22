import { expect } from '@playwright/test'

const loginWith = async (page, { username, password }) => {
  await page.getByRole('button', { name: 'Login' }).click()
  await page.getByLabel('Username:').fill(username)
  await page.getByLabel('Password:').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
}

const createBlog = async (page, { title, author, url }) => {
  await page.getByRole('button', { name: 'Create New Blog' }).click()
  await page.getByLabel('title:').fill(title)
  await page.getByLabel('author:').fill(author)
  await page.getByLabel('url').fill(url)
  const createResponse = page.waitForResponse(
    res => res.url().includes('/api/blogs') && res.request().method() === 'POST'
  )
  await page.getByRole('button', { name: 'Create' }).click()
  await createResponse
  await expect(page.getByText(title)).toBeVisible()
}

const createUser = async (request, { name, username, password }) => {
  await request.post('/api/users', {
    data: {
      name,
      username,
      password,
    },
  })
}

export { loginWith, createBlog, createUser }
