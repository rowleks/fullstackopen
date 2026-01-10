# Library Frontend (Part 8)

A modern React frontend application demonstrating GraphQL integration with Apollo Client. This application provides a comprehensive user interface for managing a library's book and author catalog, featuring authentication, real-time updates, and personalized recommendations.

## Features

- **GraphQL Integration**: Complete Apollo Client setup with queries and mutations
- **User Authentication**: JWT-based login and user session management
- **Book Management**: Add, view, and filter books by genre and author
- **Author Management**: View author profiles and edit birth years
- **Personalized Recommendations**: Book suggestions based on user preferences
- **Real-time Updates**: Apollo Client cache management and optimistic updates
- **Responsive Design**: Modern UI with Tailwind CSS styling
- **Form Handling**: Advanced forms with React Select for multi-select inputs

## Prerequisites

- Node.js (v16 or higher)
- pnpm (or npm/yarn)
- Backend API (small-library) running

## Installation

1. Install dependencies:

```bash
pnpm install
```

## Usage

1. Ensure the backend (small-library) is running on port 4000

2. Start the development server:

```bash
pnpm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

4. Create a user account or login with existing credentials

5. Explore books, authors, and get personalized recommendations

## Project Structure

```
library-frontend/
├── src/
│   ├── components/
│   │   ├── Authors.jsx         # Author list and management
│   │   ├── Books.jsx           # Book catalog with filtering
│   │   ├── NewBook.jsx         # Add new book form
│   │   ├── Login.jsx           # User authentication
│   │   ├── RecommendedBooks.jsx # Personalized recommendations
│   │   └── EditAuthor.jsx      # Edit author birth year
│   ├── queries.js              # GraphQL queries and mutations
│   ├── App.jsx                 # Main app with routing
│   ├── main.jsx                # Application entry point
│   └── styles.css              # Global styles
├── public/
│   └── vite.svg
├── package.json
└── README.md
```

## GraphQL Operations

### Queries
```javascript
// Get all books with optional filtering
const ALL_BOOKS = gql`
  query AllBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      published
      author { name }
      genres
      id
    }
  }
`

// Get all authors
const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

// Get current user
const ME = gql`
  query Me {
    me {
      username
      favoriteGenre
    }
  }
`
```

### Mutations
```javascript
// Add new book
const ADD_BOOK = gql`
  mutation AddBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      title
      author { name }
      genres
    }
  }
`

// Edit author
const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

// User login
const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
```

## Apollo Client Setup

The application uses Apollo Client with custom configuration:

```javascript
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('library-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
```

## Routing Structure

```
/                    # Authors page (default)
/authors             # Author list and management
/books               # Book catalog with genre filtering
/add                 # Add new book form
/recommended-books   # Personalized book recommendations
/login               # User authentication
```

## Components Overview

### Authors.jsx
- Displays all authors with book counts
- Edit author birth year (authenticated users only)
- Real-time updates when authors are modified

### Books.jsx
- Shows all books with genre filtering
- Filter dropdown for different genres
- Displays book details with author information

### NewBook.jsx
- Form to add new books with validation
- Author selection (creates new author if doesn't exist)
- Genre selection with multi-select
- Requires authentication

### RecommendedBooks.jsx
- Shows books based on user's favorite genre
- Fetches user preferences from GraphQL API
- Personalized recommendations

### Login.jsx
- User authentication form
- JWT token management
- Local storage for session persistence

## Technologies Used

- **React 19** - Modern React with hooks and concurrent features
- **Apollo Client 4** - Powerful GraphQL client
- **GraphQL 16** - Query language for API
- **React Router 7** - Declarative routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Select** - Advanced select components
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting and quality

## Key Concepts Demonstrated

This GraphQL frontend demonstrates:

- **Apollo Client Configuration**: HTTP link, auth link, and cache setup
- **Query and Mutation Hooks**: `useQuery`, `useMutation` usage
- **Authentication Flow**: JWT token handling and context passing
- **Cache Management**: Apollo cache updates and optimistic updates
- **Error Handling**: GraphQL error boundaries and user feedback
- **Form Integration**: Complex forms with GraphQL mutations
- **Routing with Data**: Route-based component rendering with GraphQL data

## Apollo Client Patterns

### Query with Variables
```javascript
const { data, loading, error } = useQuery(ALL_BOOKS, {
  variables: { genre: selectedGenre }
})
```

### Mutation with Error Handling
```javascript
const [addBook] = useMutation(ADD_BOOK, {
  onError: (error) => {
    console.error('Error adding book:', error)
  },
  update: (cache, response) => {
    // Update cache after successful mutation
  }
})
```

### Cache Updates
```javascript
// Update cache after adding book
update: (cache, response) => {
  cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => ({
    allBooks: allBooks.concat(response.data.addBook)
  }))
}
```

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run lint` - Run ESLint
- `pnpm run preview` - Preview production build

## Development Features

- **Hot Module Replacement**: Fast development with Vite
- **TypeScript Ready**: Configuration ready for TypeScript migration
- **Modern CSS**: Tailwind CSS with utility classes
- **Component Architecture**: Modular, reusable components
- **State Management**: Apollo Client for server state

This frontend application showcases modern React development with GraphQL, providing a complete user experience for library management with authentication, routing, and real-time data updates.