# Bloglist Frontend

A modern React frontend for the Bloglist application, built with Vite. This frontend provides an intuitive user interface for managing blog posts, user authentication, and interacting with the Bloglist API.

## Features

- **User Authentication**: Login and registration with JWT token management
- **Blog Management**: Create, view, update, and delete blog posts
- **Responsive Design**: Modern UI with responsive layout
- **Real-time Updates**: Live updates for blog interactions
- **Error Handling**: Comprehensive error handling and user feedback
- **Testing**: Unit and integration tests with Vitest and Testing Library
- **Code Quality**: ESLint and Prettier for consistent code formatting

## Prerequisites

- Node.js (v16 or higher)
- pnpm (or npm/yarn)
- Backend API running (see bloglist-BE)

## Installation

1. Install dependencies:

```bash
pnpm install
```

## Usage

1. Start the development server:

```bash
pnpm run dev
```

2. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

3. Ensure the backend API is running on port 3030

## Project Structure

```
bloglist-FE/
├── src/
│   ├── components/       # React components
│   ├── services/         # API service functions
│   ├── utils/           # Utility functions
│   └── main.jsx         # Application entry point
├── public/              # Static assets
├── tests/               # Test files
└── package.json
```

## Testing

Run the test suite to verify component functionality:

```bash
# Run tests once
pnpm test

# Run tests with coverage
pnpm run coverage

# Run tests in watch mode
pnpm test --watch
```

## Development Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run lint` - Run ESLint
- `pnpm run format` - Format code with Prettier
- `pnpm run preview` - Preview production build

## Configuration

### API Proxy

The development server is configured to proxy API requests to the backend:

```javascript
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3030',
      changeOrigin: true,
    },
  },
}
```

### Environment Variables

The application expects the backend API to be available at `/api`. In production, configure the API base URL as needed.

## Technologies Used

- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Axios** - HTTP client for API requests
- **Vitest** - Modern testing framework
- **Testing Library** - React component testing utilities
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting

## Key Concepts Demonstrated

This frontend project demonstrates:

- React component architecture and composition
- State management for authentication and data
- API integration with Axios
- Form handling and validation
- Error boundary patterns
- Component testing strategies
- Modern React patterns (hooks, functional components)
- Responsive UI design principles

## Integration with Backend

This frontend is designed to work with the Bloglist backend API. Ensure the backend is running and configured properly for full functionality:

- User authentication endpoints
- Blog CRUD operations
- Proper CORS configuration
- JWT token handling

## Testing Coverage

The application includes comprehensive testing for:

- Component rendering and interactions
- Form submissions and validation
- API service functions
- Error handling scenarios
- User authentication flows
- Blog management operations
