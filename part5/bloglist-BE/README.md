# Bloglist (Part 4)

A full-stack blog list application built with Node.js, Express, and MongoDB. The application allows users to save information about interesting blogs they find on the internet, with user authentication and authorization features.

## Features

- **User Authentication**: Secure user registration and login with JWT tokens
- **Blog Management**: Create, read, update, and delete blog posts
- **Testing**: Comprehensive test suite using Node's built-in test runner
- **Data Validation**: Input validation for all API endpoints
- **Error Handling**: Proper error handling with appropriate HTTP status codes
- **RESTful API**: Well-structured API following REST principles
- **MongoDB Integration**: Persistent data storage using MongoDB with Mongoose

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
```

## Usage

1. Start the development server:

```bash
pnpm dev
```

2. Run tests:

```bash
pnpm test
```

3. Start production server:

```bash
pnpm start
```

## API Endpoints

### Authentication

- `POST /api/login` - User login
- `POST /api/users` - Register new user

### Blogs

- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create new blog (requires authentication)
- `GET /api/blogs/:id` - Get single blog
- `DELETE /api/blogs/:id` - Delete blog (requires authentication)
- `PUT /api/blogs/:id` - Update blog (requires authentication)

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user

## Testing

The application includes both unit and integration tests. To run the tests:

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm run coverage
```

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `SECRET`: Secret key for JWT token signing
- `NODE_ENV`: Application environment (development, test, production)
- `TEST_MONGODB_URI`: MongoDB connection string for test environment

## Dependencies

- Express.js - Web framework
- MongoDB with Mongoose - Database
- JSON Web Tokens - Authentication
- bcryptjs - Password hashing
- Jest - Testing framework
- Supertest - HTTP assertions
- ESLint & Prettier - Code quality and formatting
