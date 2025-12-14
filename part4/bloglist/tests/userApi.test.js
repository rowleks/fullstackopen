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
})

after(async () => {
  await closeDbConnection()
})
