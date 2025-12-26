# State Management Applications (Part 6)

Modern React applications demonstrating different state management approaches. This part explores various techniques for managing both client-side and server-side state in React applications, including Redux for complex state management and TanStack Query for server state synchronization.

## Projects Overview

This part contains three separate React applications, each demonstrating different state management patterns:

### anecdotes-query/
A React application using **TanStack Query (React Query)** for server state management. Features anecdote voting and creation with optimistic updates, caching, and error handling.

### anecdotes-redux/
A React application using **Redux** for client state management. Demonstrates Redux store, reducers, and action creators for managing a collection of programming anecdotes with voting functionality.

### unicafe-redux/
A feedback collection application using **Redux** for state management. Shows basic Redux patterns including actions, reducers, and store integration for collecting and displaying user feedback statistics.

## Features

- **Multiple State Management Approaches**: Redux vs React Query comparison
- **Server State Management**: TanStack Query for API synchronization
- **Client State Management**: Redux for complex application state
- **Optimistic Updates**: Immediate UI feedback with error rollback
- **Caching Strategies**: Automatic and manual cache management
- **Error Handling**: Robust error boundaries and user feedback
- **Testing**: Unit tests for reducers and components
- **Modern React**: Using React 19 with hooks and functional components

## Prerequisites

- Node.js (v16 or higher)
- pnpm (or npm/yarn)
- For anecdotes-query: JSON Server (included as dependency)

## Installation & Usage

Each project can be run independently:

### anecdotes-query
```bash
cd anecdotes-query
pnpm install
pnpm run server  # Start JSON server in one terminal
pnpm run dev     # Start dev server in another terminal
```

### anecdotes-redux
```bash
cd anecdotes-redux
pnpm install
pnpm run dev
```

### unicafe-redux
```bash
cd unicafe-redux
pnpm install
pnpm run dev
pnpm test  # Run tests
```

## Project Structure

```
part6/
├── anecdotes-query/              # React Query implementation
├── anecdotes-redux/              # Redux anecdotes application
├── unicafe-redux/                # Redux feedback application
└── README.md
```

## Technologies Used

- **React 19** - Modern React with latest features
- **Redux 5** - Predictable state container
- **TanStack Query 5** - Powerful data synchronization
- **Vite** - Fast build tool and development server
- **JSON Server** - Mock REST API
- **Vitest** - Modern testing framework
- **ESLint & Prettier** - Code quality and formatting

## Key Concepts Demonstrated

This part focuses on state management patterns:

- **Redux Fundamentals**: Actions, reducers, store, and subscriptions
- **React Query**: Server state, caching, and synchronization
- **Optimistic Updates**: Immediate UI feedback
- **Error Handling**: Graceful failure recovery
- **State Separation**: Client vs server state management
- **Testing State Logic**: Unit testing for reducers
- **Context API**: React context for component communication
- **Custom Hooks**: Encapsulating stateful logic

## State Management Comparison

### Redux (Client State)
- **Best for**: Complex client-side state with multiple interactions
- **Features**: Predictable updates, time-travel debugging, middleware
- **Use cases**: Form state, UI state, application-wide state

### TanStack Query (Server State)
- **Best for**: Server state synchronization and API data
- **Features**: Automatic caching, background updates, optimistic updates
- **Use cases**: API data, real-time data, offline support

## Learning Objectives

By the end of this part, you should understand:

- When to use Redux vs React Query vs local state
- Implementing Redux store, reducers, and actions
- Using React Query for data fetching and mutations
- Handling loading states and error boundaries
- Optimistic updates and cache management
- Testing state management logic
- Modern React patterns with hooks

## Available Scripts

Each project has its own scripts defined in their respective `package.json` files. Common scripts include:

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run test` - Run test suite
- `pnpm run lint` - Run ESLint

## Next Steps

After completing Part 6, you should have a solid understanding of:

- State management patterns in modern React applications
- Choosing the right tool for different state management needs
- Implementing complex state logic with confidence
- Building robust applications with proper error handling

This foundation will prepare you for more advanced topics in full-stack development and application architecture.
