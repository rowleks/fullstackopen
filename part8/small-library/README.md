# Small Library Backend (Part 8)

A GraphQL API backend for a library management system built with Apollo Server and MongoDB. This backend provides complete CRUD operations for books and authors, user authentication, and advanced GraphQL features including filtering, recommendations, and real-time data management.

## Features

- **GraphQL API**: Complete GraphQL schema with queries and mutations
- **Authentication**: JWT-based user authentication and authorization
- **Book Management**: Full CRUD operations with genre-based filtering
- **Author Management**: Author profiles with birth year editing and statistics
- **User System**: User registration, login, and preference management
- **Advanced Queries**: Filtering by author, genre, and user preferences
- **Real-time Capabilities**: Ready for GraphQL subscriptions
- **Database Integration**: MongoDB with Mongoose ODM

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- pnpm (or npm/yarn)

## Installation

1. Install dependencies:

```bash
pnpm install
```

2. Create a `.env` file in the root directory:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Usage

1. Start the GraphQL server:

```bash
pnpm run dev
```

2. The server will start on `http://localhost:4000`

3. Access GraphQL Playground at `http://localhost:4000` for testing queries

## Project Structure

```
small-library/
├── models/
│   ├── author.js             # Author MongoDB schema
│   ├── book.js               # Book MongoDB schema
│   └── user.js               # User MongoDB schema
├── schema.js                 # GraphQL type definitions
├── resolvers.js              # GraphQL resolvers
├── db.js                     # Database connection
├── index.js                  # Apollo Server setup
├── server.js                 # Server startup script
├── package.json
└── README.md
```

## GraphQL Schema

### Type Definitions
```javascript
const typeDefs = /* GraphQL */ `
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors(name: String): [Author!]!
    allGenres: [String!]!
    me: User
    allUsers(name: String): [User!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`
```

## Resolvers Implementation

### Query Resolvers
```javascript
const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate('author')
      }

      let query = {}

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (author) {
          query.author = author._id
        } else {
          return []
        }
      }

      if (args.genre) {
        query.genres = { $in: [args.genre] }
      }

      return Book.find(query).populate('author')
    },

    allAuthors: () => Author.find({}),

    allGenres: async () => {
      const books = await Book.find({})
      const genres = [...new Set(books.flatMap(book => book.genres))]
      return genres
    },

    me: (root, args, context) => context.currentUser,
  }
}
```

### Mutation Resolvers
```javascript
Mutation: {
  addBook: async (root, args, context) => {
    if (!context.currentUser) {
      throw new GraphQLError('not authenticated', {
        extensions: { code: 'BAD_USER_INPUT' }
      })
    }

    let author = await Author.findOne({ name: args.author })

    if (!author) {
      author = new Author({ name: args.author })
      await author.save()
    }

    const book = new Book({ ...args, author: author._id })
    await book.save()

    return book.populate('author')
  },

  editAuthor: async (root, args, context) => {
    if (!context.currentUser) {
      throw new GraphQLError('not authenticated')
    }

    const author = await Author.findOne({ name: args.name })
    if (!author) return null

    author.born = args.setBornTo
    await author.save()
    return author
  },

  createUser: async (root, args) => {
    const user = new User({ ...args })
    return user.save()
      .catch(error => {
        throw new GraphQLError('Creating user failed', {
          extensions: { code: 'BAD_USER_INPUT', error }
        })
      })
  },

  login: async (root, args) => {
    const user = await User.findOne({ username: args.username })

    if (!user || args.password !== 'secret') {
      throw new GraphQLError('wrong credentials', {
        extensions: { code: 'BAD_USER_INPUT' }
      })
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
  }
}
```

## Database Models

### Author Model
```javascript
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
})

authorSchema.virtual('bookCount').get(function() {
  return this.books ? this.books.length : 0
})
```

### Book Model
```javascript
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 2
  },
  published: {
    type: Number,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },
  genres: [
    {
      type: String,
      required: true
    }
  ]
})
```

### User Model
```javascript
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  favoriteGenre: {
    type: String,
    required: true
  }
})
```

## Apollo Server Setup

```javascript
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})
```

## Technologies Used

- **Node.js** - JavaScript runtime
- **Apollo Server 5** - GraphQL server implementation
- **GraphQL 16** - Query language and schema definition
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **UUID** - Unique identifier generation

## Key Concepts Demonstrated

This GraphQL backend demonstrates:

- **Schema Definition**: Type definitions and relationships
- **Resolver Implementation**: Query and mutation logic
- **Authentication**: JWT tokens and user context
- **Database Integration**: MongoDB operations with Mongoose
- **Error Handling**: GraphQL errors with proper error codes
- **Data Relationships**: Author-book relationships and population
- **Advanced Queries**: Filtering and computed fields
- **Context Passing**: User authentication context in resolvers

## GraphQL Best Practices

### Schema Design
- Clear separation of types and relationships
- Proper nullability with `!` for required fields
- Input validation through schema constraints

### Resolver Patterns
- Authentication checks in mutation resolvers
- Proper error handling with GraphQLError
- Database population for related data
- Context usage for authenticated operations

### Authentication Flow
- JWT token verification in context function
- User lookup and attachment to context
- Authorization checks in protected resolvers

## Available Scripts

- `pnpm run dev` - Start development server with auto-reload
- `pnpm run start` - Start production server

## API Testing

Use GraphQL Playground at `http://localhost:4000` to test queries:

### Example Queries
```graphql
# Get all books
query {
  allBooks {
    title
    author { name }
    genres
  }
}

# Get books by genre
query {
  allBooks(genre: "fantasy") {
    title
    author { name }
  }
}

# Add a book (requires authentication)
mutation {
  addBook(
    title: "New Book"
    published: 2024
    author: "Author Name"
    genres: ["fiction"]
  ) {
    title
    author { name }
  }
}
```

## Development Features

- **Hot Reload**: Automatic server restart on file changes
- **Error Logging**: Comprehensive error logging and handling
- **Database Seeding**: Ready for initial data population
- **Environment Configuration**: Secure environment variable handling
- **Modular Architecture**: Separated concerns across files

This backend provides a solid foundation for GraphQL APIs, demonstrating authentication, database integration, and complex query patterns in a real-world library management system.