# Extended Bloglist Application (Part 7)

A comprehensive full-stack blog application with advanced features including routing, user management, comments, and sophisticated custom hooks. This extended version builds upon the basic bloglist with modern React patterns, protected routes, and enhanced user experience.

## Features

- **Client-Side Routing**: React Router implementation with protected and parameterized routes
- **User Management**: Registration, login, and user profiles with detailed statistics
- **Blog Comments**: Users can add comments to blog posts
- **Advanced Custom Hooks**: Custom hooks for resource management and API interactions
- **Context-Based State**: Global user state management with React Context
- **Protected Routes**: Authentication-required sections with automatic redirects
- **Responsive Design**: Tailwind CSS for modern, responsive UI
- **Comprehensive Testing**: Unit and integration tests for components and hooks
- **Real-time Updates**: Optimistic updates with TanStack Query

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- pnpm (or npm/yarn)

## Installation

1. Clone and navigate to the project directory:

```bash
cd bloglist-extended
```

2. Set up the backend:

```bash
cd backend
pnpm install
```

3. Create a `.env` file in the backend directory:

```
MONGODB_URI=your_mongodb_connection_string
SECRET=your_jwt_secret_key
NODE_ENV=development
TEST_MONGODB_URI=your_test_database_uri
PORT=3030
```

4. Set up the frontend:

```bash
cd ../frontend
pnpm install
```

## Usage

1. Start the backend server:

```bash
cd backend
pnpm run dev
```

2. In a separate terminal, start the frontend:

```bash
cd frontend
pnpm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

4. Register a new account or login with existing credentials

## Project Structure

```
bloglist-extended/
├── backend/                    # Express.js REST API
│   ├── controllers/           # Route handlers for blogs, users, comments
│   ├── models/                # Mongoose schemas
│   ├── utils/                 # Helper functions and middleware
│   ├── tests/                 # API and integration tests
│   └── database/              # Database connection
├── frontend/                   # React single-page application
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── context/           # React Context providers
│   │   ├── hooks/             # Custom hooks
│   │   ├── services/          # API service functions
│   │   └── utils/             # Utility functions
│   ├── public/                # Static assets
│   └── tests/                 # Component tests
```

## API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/users` - User registration

### Blogs
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create new blog (authenticated)
- `GET /api/blogs/:id` - Get single blog
- `PUT /api/blogs/:id` - Update blog (authenticated, owner only)
- `DELETE /api/blogs/:id` - Delete blog (authenticated, owner only)

### Users
- `GET /api/users` - Get all users with blog counts
- `GET /api/users/:id` - Get single user with their blogs

### Comments
- `GET /api/blogs/:id/comments` - Get comments for a blog
- `POST /api/blogs/:id/comments` - Add comment to blog (authenticated)

## Custom Hooks

### useBlogResource
```javascript
const [blogs, blogService] = useBlogResource()
// Returns blogs data and CRUD operations
```

### useUserResources
```javascript
const { users, userService } = useUserResources()
// Returns users data and user operations
```

### useField (extended)
Enhanced form field hook with validation and formatting options.

## Routing Structure

```
/                    # Home/Login page
/register            # User registration
/blogs               # Blog listing (protected)
/blogs/:id           # Individual blog details
/users               # User listing (protected)
/users/:id           # User profile and their blogs
```

## Technologies Used

- **Frontend**:
  - React 19 with modern hooks
  - React Router 7 for routing
  - TanStack Query for data fetching
  - Tailwind CSS for styling
  - Axios for HTTP requests
  - Vitest for testing

- **Backend**:
  - Node.js with Express.js
  - MongoDB with Mongoose
  - JWT for authentication
  - bcryptjs for password hashing
  - Comprehensive testing with Node test runner

## Key Concepts Demonstrated

This extended bloglist demonstrates:

- **Advanced Routing**: Protected routes, parameterized routes, and nested routing
- **Context API**: Global state management for user authentication
- **Custom Hooks**: Resource management hooks for blogs and users
- **Authentication Flow**: Registration, login, and protected routes
- **Optimistic Updates**: Immediate UI feedback with server synchronization
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Component Composition**: Higher-order components and render props
- **Testing Strategies**: Unit tests, integration tests, and E2E testing

## Testing

Run comprehensive test suites:

```bash
# Backend tests
cd backend
pnpm test

# Frontend tests
cd frontend
pnpm test
pnpm run coverage
```

## Development Scripts

### Backend
- `pnpm run dev` - Start development server with auto-reload
- `pnpm run test` - Run API tests
- `pnpm run coverage` - Run tests with coverage

### Frontend
- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run test` - Run component tests
- `pnpm run coverage` - Run tests with coverage
- `pnpm run lint` - Run ESLint

## Database Schema

### User Model
```javascript
{
  username: String (unique, required),
  name: String (required),
  passwordHash: String (required),
  blogs: [{ type: ObjectId, ref: 'Blog' }]
}
```

### Blog Model
```javascript
{
  title: String (required),
  author: String (required),
  url: String (required),
  likes: Number (default: 0),
  user: { type: ObjectId, ref: 'User', required },
  comments: [{ type: ObjectId, ref: 'Comment' }]
}
```

### Comment Model
```javascript
{
  content: String (required),
  blog: { type: ObjectId, ref: 'Blog', required },
  user: { type: ObjectId, ref: 'User', required },
  createdAt: Date (default: Date.now)
}
```

## Advanced Features

- **Real-time Comments**: Add and view comments on blog posts
- **User Statistics**: View user profiles with blog counts and recent activity
- **Optimistic UI**: Immediate feedback for user actions
- **Error Recovery**: Graceful error handling with user-friendly messages
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Comprehensive PropTypes and input validation

This extended version showcases building production-ready React applications with routing, authentication, and complex state management patterns.