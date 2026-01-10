# GraphQL Library Application (Part 8)

Full-stack library management system demonstrating GraphQL implementation with Apollo Server and Apollo Client. This part explores GraphQL queries, mutations, authentication, and real-time data management in a comprehensive book and author catalog application.

## Projects Overview

This part contains two interconnected applications that form a complete GraphQL-based library system:

### library-frontend/
A modern React frontend using Apollo Client for GraphQL operations. Features user authentication, book and author management, and personalized book recommendations with routing and real-time updates.

### small-library/
A GraphQL API backend using Apollo Server with MongoDB. Implements complete CRUD operations for books and authors, user authentication, and advanced GraphQL features like filtering and recommendations.

## Features

- **GraphQL API**: Complete GraphQL schema with queries and mutations
- **Authentication**: JWT-based user authentication and authorization
- **Book Management**: Full CRUD operations for books with genre filtering
- **Author Management**: Author profiles with birth year editing
- **User Recommendations**: Personalized book recommendations based on favorite genres
- **Real-time Updates**: Apollo Client cache management and optimistic updates
- **Advanced Queries**: Filtering by author, genre, and user preferences
- **Type Safety**: Strong typing with GraphQL schema definitions

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- pnpm (or npm/yarn)

## Installation & Usage

### Backend Setup (small-library)
```bash
cd small-library
pnpm install
# Create .env file with MONGODB_URI and JWT_SECRET
pnpm run dev
```

### Frontend Setup (library-frontend)
```bash
cd library-frontend
pnpm install
pnpm run dev
```

Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
part8/
├── library-frontend/         # React GraphQL client
│   ├── src/
│   │   ├── components/      # React components for books/authors
│   │   ├── queries.js       # GraphQL queries and mutations
│   │   └── App.jsx          # Main app with routing
├── small-library/            # GraphQL API server
│   ├── models/              # MongoDB schemas
│   ├── schema.js            # GraphQL type definitions
│   ├── resolvers.js         # GraphQL resolvers
│   └── index.js             # Apollo Server setup
```

## GraphQL Schema

### Core Types
```graphql
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
```

### Queries
- `allBooks(author: String, genre: String)` - Filter books by author/genre
- `allAuthors` - Get all authors with book counts
- `allGenres` - Get unique genres
- `me` - Get current user info
- `bookCount`, `authorCount` - Statistics

### Mutations
- `addBook(title, published, author, genres)` - Add new book
- `editAuthor(name, setBornTo)` - Update author birth year
- `createUser(username, favoriteGenre)` - Register new user
- `login(username, password)` - User authentication

## Technologies Used

- **Frontend**:
  - React 19 with modern hooks
  - Apollo Client 4 for GraphQL
  - React Router 7 for navigation
  - Tailwind CSS for styling
  - React Select for form inputs

- **Backend**:
  - Node.js with Apollo Server 5
  - GraphQL 16 for schema definition
  - MongoDB with Mongoose
  - JWT for authentication
  - UUID for ID generation

## Key Concepts Demonstrated

This GraphQL implementation introduces:

- **Schema Definition**: Type definitions and resolvers
- **Apollo Server**: GraphQL server setup and configuration
- **Apollo Client**: Client-side GraphQL operations
- **Authentication**: JWT tokens and user context
- **Caching**: Apollo Client cache management
- **Optimistic Updates**: Immediate UI feedback
- **Error Handling**: GraphQL error boundaries
- **Advanced Queries**: Filtering and nested data fetching

## GraphQL Best Practices

### Schema Design
- Clear type definitions with proper relationships
- Input validation with non-null constraints
- Computed fields (bookCount on Author)

### Resolver Patterns
```javascript
const resolvers = {
  Query: {
    allBooks: (root, args) => {
      // Filtering logic based on args
    }
  },
  Mutation: {
    addBook: (root, args, context) => {
      // Authentication check
      // Database operations
    }
  }
}
```

### Client Usage
```javascript
const GET_BOOKS = gql`
  query GetBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author { name }
      genres
    }
  }
`
```

## Learning Objectives

By the end of this part, you should understand:

- GraphQL schema design and type definitions
- Implementing resolvers for queries and mutations
- Apollo Server and Apollo Client integration
- Authentication and authorization in GraphQL
- Advanced GraphQL features like filtering and relationships
- Cache management and optimistic updates
- Building full-stack applications with GraphQL

## Advanced Features

- **Genre Filtering**: Books can be filtered by genre
- **Author Statistics**: Automatic book count calculation
- **User Preferences**: Personalized recommendations
- **Real-time Data**: Live updates with Apollo subscriptions
- **Type Safety**: Strong typing throughout the application

## Next Steps

After completing Part 8, you should have a solid understanding of:

- GraphQL as an alternative to REST APIs
- Full-stack development with modern tools
- Authentication patterns in GraphQL applications
- Building scalable and maintainable APIs
- Advanced client-side state management with Apollo

This foundation prepares you for building sophisticated web applications with GraphQL and modern frontend frameworks.