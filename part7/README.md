# Custom Hooks and Advanced React Patterns (Part 7)

Advanced React applications demonstrating custom hooks, routing, and complex state management patterns. This part explores building reusable logic with custom hooks, implementing client-side routing, and creating sophisticated user interfaces with modern React techniques.

## Projects Overview

This part contains four separate React applications, each demonstrating different advanced React concepts:

### bloglist-extended/
An extended full-stack blog application with routing, user management, comments, and advanced custom hooks. Features protected routes, user registration, blog commenting, and sophisticated data management.

### country-hook/
A React application demonstrating custom hooks for form handling and API data fetching. Shows how to create reusable hooks for common patterns like controlled inputs and REST API consumption.

### routed-anecdotes/
A React application using React Router for client-side routing. Demonstrates navigation between different views, parameterized routes, and programmatic navigation in a single-page application.

### ultimate-hooks/
An advanced React application showcasing complex custom hooks for resource management. Demonstrates creating generic hooks for CRUD operations with external APIs.

## Features

- **Custom Hooks**: Reusable logic extraction with `useField`, `useResource`, `useCountry`
- **Client-Side Routing**: React Router implementation with protected routes and nested routing
- **Advanced State Management**: Complex state patterns with context and custom hooks
- **API Integration**: RESTful API consumption with error handling and loading states
- **User Authentication**: Login, registration, and protected route patterns
- **Modern React Patterns**: Hooks, context, routing, and component composition
- **Testing**: Comprehensive test suites for components and hooks
- **Styling**: Tailwind CSS integration for modern UI design

## Prerequisites

- Node.js (v16 or higher)
- pnpm (or npm/yarn)
- For bloglist-extended: MongoDB instance (local or cloud)

## Installation & Usage

Each project can be run independently:

### bloglist-extended
```bash
cd bloglist-extended
# Backend setup
cd backend
pnpm install
# Configure .env with MongoDB URI
pnpm run dev

# Frontend setup (in separate terminal)
cd ../frontend
pnpm install
pnpm run dev
```

### country-hook
```bash
cd country-hook
pnpm install
pnpm run dev
```

### routed-anecdotes
```bash
cd routed-anecdotes
pnpm install
pnpm run dev
```

### ultimate-hooks
```bash
cd ultimate-hooks
pnpm install
pnpm run server  # Start JSON server in one terminal
pnpm run dev     # Start dev server in another terminal
```

## Project Structure

```
part7/
├── bloglist-extended/          # Full-stack blog app with routing
│   ├── backend/               # Express.js API with MongoDB
│   └── frontend/              # React app with routing
├── country-hook/              # Custom hooks for country data
├── routed-anecdotes/          # React Router implementation
└── ultimate-hooks/            # Advanced resource management hooks
```

## Technologies Used

- **React 18/19** - Modern React with hooks and concurrent features
- **React Router 7** - Declarative routing for React
- **TanStack Query** - Powerful data synchronization
- **Axios** - HTTP client for API requests
- **Express.js** - Web framework for Node.js
- **MongoDB with Mongoose** - NoSQL database
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Vitest** - Modern testing framework

## Key Concepts Demonstrated

This part focuses on advanced React patterns:

- **Custom Hooks**: `useField`, `useResource`, `useCountry`, `useBlogResource`
- **Client-Side Routing**: Route configuration, navigation, and protected routes
- **Context API**: Global state management for user authentication
- **Higher-Order Components**: Component composition patterns
- **Resource Management**: Generic hooks for API interactions
- **Form Handling**: Controlled components and custom input hooks
- **Error Boundaries**: Graceful error handling in React applications
- **Optimistic Updates**: Immediate UI feedback with server synchronization

## Custom Hooks Showcase

### useField
```javascript
const input = useField('text')
return <input {...input} />
```

### useResource
```javascript
const [resources, service] = useResource('/api/items')
service.create({ name: 'New Item' })
```

### useCountry
```javascript
const country = useCountry('finland')
// Returns country data from REST Countries API
```

## Routing Patterns

- **Basic Routes**: `/`, `/about`, `/create`
- **Parameterized Routes**: `/anecdotes/:id`, `/users/:id`, `/blogs/:id`
- **Protected Routes**: Authentication-required sections
- **Programmatic Navigation**: Redirects and conditional routing

## Learning Objectives

By the end of this part, you should understand:

- Creating and using custom hooks for reusable logic
- Implementing client-side routing with React Router
- Building complex user interfaces with routing and navigation
- Managing global application state with Context API
- Creating generic hooks for API resource management
- Implementing authentication and protected routes
- Advanced form handling patterns in React
- Testing custom hooks and routed components

## Next Steps

After completing Part 7, you should have a solid understanding of:

- Advanced React patterns and hooks
- Client-side routing and navigation
- Complex state management in React applications
- Building full-featured web applications
- Testing advanced React components and hooks

This foundation prepares you for building sophisticated React applications with routing, authentication, and complex user interactions.