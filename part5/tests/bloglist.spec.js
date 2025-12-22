const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/reset')
    await request.post('/api/users', {
      data: {
        name: 'Rowland Momoh',
        username: 'Rolex',
        password: 'Rolex10',
      },
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText(/bloglist/i)).toBeVisible()
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'Login' }).click()
      await page.getByLabel('Username:').fill('Rolex')
      await page.getByLabel('Password:').fill('Rolex10')
      await page.getByRole('button', { name: 'Login' }).click()
      await expect(page.getByText(/welcome rolex/i)).toBeVisible()
    })

    test('fails with incorrect credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'Login' }).click()
      await page.getByLabel('Username:').fill('Rolex')
      await page.getByLabel('Password:').fill('Password')
      await page.getByRole('button', { name: 'Login' }).click()
      await expect(
        page
          .locator('div')
          .filter({ hasText: /^Incorrect username or password$/ })
      ).toBeVisible()
      await expect(page.getByText(/welcome rolex/i)).not.toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'Login' }).click()
      await page.getByLabel('Username:').fill('Rolex')
      await page.getByLabel('Password:').fill('Rolex10')
      await page.getByRole('button', { name: 'Login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'Create New Blog' }).click()
      await page.getByLabel('title:').fill('Testing With Playwright')
      await page.getByLabel('author:').fill('Rowland Momoh')
      await page.getByLabel('url').fill('https://test.com')
      const createResponse = page.waitForResponse(
        res =>
          res.url().includes('/api/blogs') && res.request().method() === 'POST'
      )
      await page.getByRole('button', { name: 'Create' }).click()
      await createResponse
      await expect(page.getByText(/Testing With Playwright/i)).toBeVisible()
    })

    describe('when one blog is created', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'Create New Blog' }).click()
        await page.getByLabel('title:').fill('Testing With Playwright')
        await page.getByLabel('author:').fill('Rowland Momoh')
        await page.getByLabel('url').fill('https://test.com')
        const createResponse = page.waitForResponse(
          res =>
            res.url().includes('/api/blogs') &&
            res.request().method() === 'POST'
        )
        await page.getByRole('button', { name: 'Create' }).click()
        await createResponse
        await expect(page.getByText(/Testing With Playwright/i)).toBeVisible()
        await page.getByRole('button', { name: 'View' }).click()
      })

      test('blog can be liked', async ({ page }) => {
        const responsePromise = page.waitForResponse(
          res =>
            res.url().includes('/api/blogs/') &&
            res.request().method() === 'PUT'
        )
        await page.getByRole('button', { name: 'Like' }).click()
        await responsePromise
        await expect(page.getByText(/Likes: 1/i)).toBeVisible()
      })

      test('blog can be deleted by creator', async ({ page }) => {
        page.once('dialog', dialog => dialog.accept())
        const deleteResponse = page.waitForResponse(
          res =>
            res.url().includes('/api/blogs/') &&
            res.request().method() === 'DELETE'
        )
        await page.getByRole('button', { name: 'Remove' }).click()
        await deleteResponse
        await expect(
          page.getByText(/Testing With Playwright/i)
        ).not.toBeVisible()
      })

      test('only blog creator can see remove button', async ({
        browser,
        request,
      }) => {
        const newContext = await browser.newContext()
        const newPage = await newContext.newPage()
        await request.post('/api/users', {
          data: {
            name: 'Jane Doe',
            username: 'janedoe',
            password: 'JaneDoe10',
          },
        })
        await newPage.goto('/')
        await newPage.getByRole('button', { name: 'Login' }).click()
        await newPage.getByLabel('Username:').fill('janedoe')
        await newPage.getByLabel('Password:').fill('JaneDoe10')
        await newPage.getByRole('button', { name: 'Login' }).click()
        await newPage.getByRole('button', { name: 'View' }).click()
        await expect(
          newPage.getByRole('button', { name: 'Remove' })
        ).not.toBeVisible()

        await newContext.close()
      })
    })

    describe('when multiple blogs are created', () => {
      beforeEach(async ({ page }) => {
        const blogs = [
          { title: 'Testing1', url: 'https://test1.com' },
          { title: 'Testing2', url: 'https://test2.com' },
          { title: 'Testing3', url: 'https://test3.com' },
        ]

        for (const blog of blogs) {
          await page.getByRole('button', { name: 'Create New Blog' }).click()
          await page.getByLabel('title:').fill(blog.title)
          await page.getByLabel('author:').fill('Rowland Momoh')
          await page.getByLabel('url').fill(blog.url)
          const createResponse = page.waitForResponse(
            res =>
              res.url().includes('/api/blogs') &&
              res.request().method() === 'POST'
          )
          await page.getByRole('button', { name: 'Create' }).click()
          await createResponse
          await expect(page.getByText(blog.title)).toBeVisible()
        }
      })

      test('blogs are sorted by most likes', async ({ page }) => {
        const viewButtons = page.getByRole('button', { name: 'View' })
        for (let i = (await viewButtons.count()) - 1; i >= 0; i--) {
          await viewButtons.nth(i).click()
        }

        const blog2 = page
          .locator('div')
          .filter({ hasText: 'Testing2' })
          .filter({ has: page.getByRole('button', { name: 'Like' }) })
          .last()
        let likeResponse = page.waitForResponse(
          res =>
            res.url().includes('/api/blogs/') &&
            res.request().method() === 'PUT'
        )
        await blog2.getByRole('button', { name: 'Like' }).click()
        await likeResponse
        await expect(blog2.getByText('Likes: 1')).toBeVisible()
        likeResponse = page.waitForResponse(
          res =>
            res.url().includes('/api/blogs/') &&
            res.request().method() === 'PUT'
        )
        await blog2.getByRole('button', { name: 'Like' }).click()
        await likeResponse
        await expect(blog2.getByText('Likes: 2')).toBeVisible()

        const blog3 = page
          .locator('div')
          .filter({ hasText: 'Testing3' })
          .filter({ has: page.getByRole('button', { name: 'Like' }) })
          .last()
        likeResponse = page.waitForResponse(
          res =>
            res.url().includes('/api/blogs/') &&
            res.request().method() === 'PUT'
        )
        await blog3.getByRole('button', { name: 'Like' }).click()
        await likeResponse
        await expect(blog3.getByText('Likes: 1')).toBeVisible()

        const blogContainers = page
          .getByRole('button', { name: /View|Hide/ })
          .locator('..')
        const allBlogsText = await blogContainers.allInnerTexts()
        expect(allBlogsText[0]).toContain('Testing2')
        expect(allBlogsText[1]).toContain('Testing3')
        expect(allBlogsText[2]).toContain('Testing1')
      })
    })
  })
})
