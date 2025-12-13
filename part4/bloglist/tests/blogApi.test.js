const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { close: closeDbConnection, clear: clearDbData } = require('../database')
const apiHelpers = require('./apiHelpers')

const api = supertest(app)

describe('when db is seeded with data', () => {
  beforeEach(async () => {
    await clearDbData()
    await Blog.insertMany(apiHelpers.initialBlogs)
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
    test('succeeds with status code 201 if all required properties are included and increases total blog count in db', async () => {
      const newBlog = {
        title: 'Testing post endpoint',
        author: 'Rowland Momoh',
        url: 'http://fso.com/testing-post-endpoint',
        likes: 15,
      }

      const blogsAtStart = await apiHelpers.getBlogsInDb()

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await apiHelpers.getBlogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)

      const titles = blogsAtEnd.map(blog => blog.title)
      assert(titles.includes(newBlog.title))
    })

    test('succeeds with status code 201 if likes property is missing and defaults to 0', async () => {
      const newBlog = {
        title: 'Testing post endpoint without likes',
        author: 'Rowland Momoh',
        url: 'http://fso.com/testing-post-endpoint-without-likes',
      }

      const blogsAtStart = await apiHelpers.getBlogsInDb()

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await apiHelpers.getBlogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)
      assert.strictEqual(response.body.likes, 0)
    })

    test('fails with status code 400 if required properties are missing', async () => {
      const newBlog = {
        author: 'Rowland Momoh',
        likes: 10,
      }

      await api.post('/api/blogs').send(newBlog).expect(400)

      const blogsAtEnd = await apiHelpers.getBlogsInDb()
      assert.strictEqual(blogsAtEnd.length, apiHelpers.initialBlogs.length)
    })
  })
})

after(async () => {
  await closeDbConnection()
})
