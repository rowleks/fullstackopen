const { test, describe } = require('node:test')
const assert = require('node:assert')
const blogList = require('./mockData')
const {
  dummy,
  calculateTotalLikes,
  calculateFaveBlog,
  mostBlogs,
  mostLikes,
} = require('../utils/listHelpers')

test('dummy returns one', () => {
  const blogs = []

  const result = dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(calculateTotalLikes([]), 0)
  })

  test('of single list is the like of that', () => {
    const singleBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0,
      },
    ]
    assert.strictEqual(calculateTotalLikes(singleBlog), 5)
  })

  test('of multiple list item is calculated right', () => {
    assert.deepStrictEqual(calculateTotalLikes(blogList), 36)
  })
})

describe('favourite blog', () => {
  test('with most like count', () => {
    const expectedResult = {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    }

    assert.deepStrictEqual(calculateFaveBlog(blogList), expectedResult)
  })
})

describe('most blogs/likes', () => {
  test('returns correct author name and blog count', () => {
    const expectedResult = {
      author: 'Robert C. Martin',
      blogs: 3,
    }
    assert.deepStrictEqual(mostBlogs(blogList), expectedResult)
  })

  test('returns correct author name and like count', () => {
    const expectedResult = {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    }
    assert.deepStrictEqual(mostLikes(blogList), expectedResult)
  })
})
