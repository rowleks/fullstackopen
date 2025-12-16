const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const { close: closeDbConnection, clear: clearDbData } = require('../database')
const apiHelpers = require('./apiHelpers')

const api = supertest(app)

describe('when db is seeded with data', () => {
  beforeEach(async () => {
    await clearDbData()
    await apiHelpers.createInitialUser()
    const user = await User.findOne({ username: 'root' })
    const blogsWithUser = apiHelpers.initialBlogs.map(blog => ({
      ...blog,
      user: user._id,
    }))
    await Blog.insertMany(blogsWithUser)
  })

  describe('GET /api/blogs', () => {
    test('succeeds with status code 200 and returns blogs as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('succeeds with status code 200 and returns total saved blogs', async () => {
      const response = await api.get('/api/blogs').expect(200)
      assert.strictEqual(response.body.length, apiHelpers.initialBlogs.length)
    })

    test('unique identifier is named id', async () => {
      const response = await api.get('/api/blogs')
      assert(Object.hasOwn(response.body[0], 'id'))
      assert(!Object.hasOwn(response.body[0], '_id'))
    })
  })

  describe('POST /api/blogs,', () => {
    let jwtToken = null

    //Login to with the test root user before any POST operation
    beforeEach(async () => {
      const loginResult = await api
        .post('/api/login')
        .send({ username: 'root', password: 'testuser123' })
        .expect(200)

      jwtToken = loginResult.body.token
    })

    test('succeeds with status code 201 if all required properties are included and increases total blog count in db', async () => {
      const blogsAtStart = await apiHelpers.getBlogsInDb()

      const newBlog = {
        title: 'Testing post endpoint',
        author: 'Rowland Momoh',
        url: 'http://fso.com/testing-post-endpoint',
        likes: 15,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await apiHelpers.getBlogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)

      const titles = blogsAtEnd.map(blog => blog.title)
      assert(titles.includes(newBlog.title))
    })

    test('succeeds with status code 201 if likes property is missing and defaults to 0', async () => {
      const blogsAtStart = await apiHelpers.getBlogsInDb()

      const newBlog = {
        title: 'Testing post endpoint without likes',
        author: 'Rowland Momoh',
        url: 'http://fso.com/testing-post-endpoint-without-likes',
      }

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await apiHelpers.getBlogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)
      assert.strictEqual(response.body.likes, 0)
    })

    test('fails with status code 400 if required properties are missing', async () => {
      const blogsAtStart = await apiHelpers.getBlogsInDb()

      const newBlog = {
        author: 'Rowland Momoh',
        likes: 10,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await apiHelpers.getBlogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })
  })

  describe('DELETE /api/blogs/:id', () => {
    let jwtToken = null

    beforeEach(async () => {
      const loginResult = await api
        .post('/api/login')
        .send({ username: 'root', password: 'testuser123' })
        .expect(200)

      jwtToken = loginResult.body.token
    })

    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await apiHelpers.getBlogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(204)

      const blogsAtEnd = await apiHelpers.getBlogsInDb()

      assert.strictEqual(blogsAtEnd.length, apiHelpers.initialBlogs.length - 1)

      const urls = blogsAtEnd.map(b => b.url)
      assert(!urls.includes(blogToDelete.url))
    })

    test('fails with status code 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .delete(`/api/blogs/${invalidId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(400)
    })

    test('fails with status code 404 if id does not exist', async () => {
      const phantomId = await apiHelpers.generatePhantomId()

      await api
        .delete(`/api/blogs/${phantomId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(404)
    })

    test('fails with status code 401 if token is invalid', async () => {
      const blogsAtStart = await apiHelpers.getBlogsInDb()

      console.log(blogsAtStart)

      await api.delete(`/api/blogs/${blogsAtStart[0].id}`).expect(401)
    })
  })

  describe('PUT /api/blogs/:id', () => {
    test('succeeds with status code 200 if id is valid and updates blog', async () => {
      const blogsAtStart = await apiHelpers.getBlogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const { title, author, url } = blogToUpdate

      const updatePayload = {
        title,
        author,
        url,
        likes: 100,
      }

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatePayload)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.title, updatePayload.title)
      assert.strictEqual(response.body.author, updatePayload.author)
      assert.strictEqual(response.body.url, updatePayload.url)
      assert.strictEqual(response.body.likes, updatePayload.likes)

      const blogsAtEnd = await apiHelpers.getBlogsInDb()
      const foundBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)

      assert.strictEqual(foundBlog.title, updatePayload.title)
      assert.strictEqual(foundBlog.author, updatePayload.author)
      assert.strictEqual(foundBlog.url, updatePayload.url)
      assert.strictEqual(foundBlog.likes, updatePayload.likes)
    })

    test('fails with status code 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'
      const updatedBlogData = {
        title: 'Updated Title',
        author: 'Updated Author',
        url: 'http://updated.com',
        likes: 100,
      }

      await api.put(`/api/blogs/${invalidId}`).send(updatedBlogData).expect(400)
    })

    test('fails with status code 404 if id does not exist', async () => {
      const phantomId = await apiHelpers.generatePhantomId()
      const updatedBlogData = {
        title: 'Updated Title',
        author: 'Updated Author',
        url: 'http://updated.com',
        likes: 100,
      }

      await api.put(`/api/blogs/${phantomId}`).send(updatedBlogData).expect(404)
    })
  })
})

describe('Unknown endpoint', () => {
  test('returns 404 for non-existent routes', async () => {
    await api.get('/api/non-existent-route').expect(404)
  })
})

after(async () => {
  await closeDbConnection()
})
