const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const { close: closeDbConnection, clear: clearDbData } = require('../database')
const apiHelpers = require('./apiHelpers')

const api = supertest(app)

describe('When db is initialized with one user', () => {
  beforeEach(async () => {
    await clearDbData()
    await apiHelpers.createInitialUser()
  })

  describe('POST /api/users', () => {
    test('creating a valid user succeeds with status code 200 and returns json', async () => {
      const usersAtStart = await apiHelpers.getUsersInDb()

      const newUser = {
        username: 'rolex',
        name: 'Rowland Momoh',
        password: 'R#13x',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await apiHelpers.getUsersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(newUser.username))
    })

    test('creation fails with status code 400 if user already exists', async () => {
      const usersAtStart = await apiHelpers.getUsersInDb()

      const existingUser = {
        username: 'root',
        name: 'Test User',
        password: 'testuser123',
      }

      const result = await api
        .post('/api/users')
        .send(existingUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await apiHelpers.getUsersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)

      assert(result.body.error.includes('username already exits'))
    })

    test('creation fails with status code 400 if pasword lenght is less than 3', async () => {
      const usersAtStart = await apiHelpers.getUsersInDb()

      const newUser = {
        username: 'newUser',
        name: 'Test User',
        password: 'ab',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await apiHelpers.getUsersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)

      assert(
        result.body.error.includes(
          'password must be at least 3 characters long'
        )
      )
    })
  })

  describe('GET /api/users', () => {
    beforeEach(async () => {
      const newBlog = {
        title: 'Testing post endpoint',
        author: 'Rowland Momoh',
        url: 'http://fso.com/testing-post-endpoint',
        likes: 15,
      }

      await api.post('/api/blogs').send(newBlog).expect(201)
    })
    test('db returns all users with associated blogs', async () => {
      const result = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(result.body[0].blogs.length, 1)
    })
  })
})

describe('When db has no users', () => {
  beforeEach(async () => {
    await clearDbData()
  })

  test('creation of blog fails if no user exists in db', async () => {
    const blogsAtStart = await apiHelpers.getBlogsInDb()

    const newBlog = {
      title: 'Testing post endpoint',
      author: 'Rowland Momoh',
      url: 'http://fso.com/testing-post-endpoint',
      likes: 15,
    }

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await apiHelpers.getBlogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)

    assert(result.body.error.includes('no user found in database'))
  })
})

after(async () => {
  await closeDbConnection()
})
