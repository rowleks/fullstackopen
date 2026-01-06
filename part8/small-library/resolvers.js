const { GraphQLError } = require('graphql')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (_, args) => {
      const filter = {}

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (!author) {
          return []
        }
        filter.author = author._id
      }

      if (args.genre) {
        filter.genres = args.genre
      }

      return Book.find(filter).populate('author')
    },
    allAuthors: async () => Author.find({}),
    me: async (_, __, { currentUser }) => currentUser,
    allUsers: async (_, args) => {
      const filter = {}
      if (args.name) {
        filter.username = args.name
      }
      return User.find(filter)
    },
    allGenres: async () => {
      const allBooks = await Book.find({})
      const genres = allBooks.flatMap(book => book.genres)
      return [...new Set(genres)]
    },
  },

  Author: {
    bookCount: async root => {
      return Book.countDocuments({ author: root._id })
    },
  },

  Mutation: {
    addBook: async (_, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      if (args.title.length < 5) {
        throw new GraphQLError('Title must be at least 5 characters long', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
          },
        })
      }

      if (args.author.length < 5) {
        throw new GraphQLError(
          'Author name must be at least 5 characters long',
          {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
            },
          }
        )
      }

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error,
            },
          })
        }
      }

      const book = new Book({ ...args, author: author._id })

      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error,
          },
        })
      }

      return book.populate('author')
    },

    editAuthor: async (_, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const author = await Author.findOne({ name: args.name })

      if (!author) {
        throw new GraphQLError('Author not found', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
          },
        })
      }

      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Updating author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }
      return author
    },

    createUser: async (_, args) => {
      const userExist = await User.findOne({ username: args.username })
      if (userExist) {
        throw new GraphQLError('Username must be unique', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
          },
        })
      }

      const user = new User({ ...args })
      try {
        return await user.save()
      } catch (error) {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        })
      }
    },

    login: async (_, { username, password }) => {
      const user = await User.findOne({ username })

      if (!user || password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const tokenPayload = {
        username,
        id: user._id,
      }

      return {
        value: jwt.sign(tokenPayload, process.env.JWT_SECRET, {
          expiresIn: '1h',
        }),
      }
    },
  },
}

module.exports = resolvers
