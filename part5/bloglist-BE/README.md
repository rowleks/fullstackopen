# Bloglist Backend

A RESTful API backend for the Bloglist application, built with Node.js, Express, and MongoDB. This backend serves the Bloglist frontend and provides comprehensive testing capabilities for the full-stack application.

## Features

- **User Authentication**: Secure user registration and login with JWT tokens
- **Blog Management**: Complete CRUD operations for blog posts
- **RESTful API**: Well-structured API following REST principles
- **MongoDB Integration**: Persistent data storage using MongoDB with Mongoose
- **Testing Support**: Comprehensive test suite with in-memory database
- **Data Validation**: Input validation for all API endpoints
- **Error Handling**: Proper error handling with appropriate HTTP status codes
- **CORS Support**: Cross-origin resource sharing for frontend integration

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- pnpm (or npm/yarn)

## Installation

1. Install dependencies:

```bash
pnpm install
```

2. Create a `.env` file in the root directory with the following variables:

```
MONGODB_URI=your_mongodb_uri
SECRET=your_jwt_secret
NODE_ENV=development
TEST_MONGODB_URI=your_test_mongodb_uri
PORT=3030
```

## Usage

1. Start the development server:

```bash
pnpm dev
```

2. Start test environment server:

```bash
pnpm start:test
```

3. Run tests:

```bash
pnpm test
```

4. Start production server:

```bash
pnpm start
```

## API Endpoints

### Authentication

- `POST /api/login` - User login (returns JWT token)
- `POST /api/users` - Register new user

### Blogs

- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create new blog (requires authentication)
- `GET /api/blogs/:id` - Get single blog
- `DELETE /api/blogs/:id` - Delete blog (requires authentication, ownership)
- `PUT /api/blogs/:id` - Update blog (requires authentication, ownership)

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user

### Testing

- `POST /api/reset` - Reset database (available only in test environment)

## Testing

The application includes comprehensive testing with Node's built-in test runner:

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm run coverage
```

Tests cover:
- API endpoint functionality
- Authentication and authorization
- Data validation
- Error handling
- Database operations

## Project Structure

```
bloglist-BE/
├── controllers/          # Route handlers
├── models/              # Mongoose schemas
├── utils/               # Helper functions and config
├── tests/               # Test files
├── app.js               # Express application setup
├── server.js            # Server startup
└── package.json
```

## Environment Variables

- `MONGODB_URI`: MongoDB connection string for development
- `TEST_MONGODB_URI`: MongoDB connection string for testing
- `SECRET`: Secret key for JWT token signing
- `NODE_ENV`: Application environment (development, test, production)
- `PORT`: Server port (default: 3030)

## Development Scripts

- `pnpm dev` - Start development server with auto-reload
- `pnpm start` - Start production server
- `pnpm start:test` - Start test environment server
- `pnpm test` - Run test suite
- `pnpm coverage` - Run tests with coverage
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## Technologies Used

- **Express.js** - Web framework for Node.js
- **MongoDB with Mongoose** - NoSQL database and ODM
- **JSON Web Tokens** - Authentication tokens
- **bcryptjs** - Password hashing
- **Morgan** - HTTP request logging
- **Cross-env** - Cross-platform environment variables
- **Supertest** - HTTP endpoint testing
- **ESLint & Prettier** - Code quality and formatting

## Key Concepts Demonstrated

This backend project demonstrates:

- RESTful API design principles
- JWT authentication and authorization
- MongoDB document modeling with Mongoose
- Middleware implementation (auth, validation, error handling)
- Testing strategies for Node.js applications
- Environment configuration management
- CORS and security best practices
- Error handling and logging patterns

## Integration with Frontend

This backend is designed to work with the Bloglist React frontend. Key integration points:

- JWT token-based authentication
- RESTful resource endpoints
- Proper HTTP status codes and error responses
- CORS configuration for cross-origin requests
- Form data validation and sanitization

## Database Schema

### User Model
- `username`: Unique username (required)
- `name`: Full name (required)
- `passwordHash`: Hashed password (required)
- `blogs`: Reference to user's blogs

### Blog Model
- `title`: Blog title (required)
- `author`: Blog author (required)
- `url`: Blog URL (required)
- `likes`: Number of likes (default: 0)
- `user`: Reference to blog creator (required)
