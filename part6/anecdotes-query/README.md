# React Query Anecdotes (Part 6)

A React application that demonstrates server state management using TanStack Query (React Query) by managing a collection of programming anecdotes. Users can vote on existing anecdotes and create new ones, with all server state managed through React Query.

## Features

- **Anecdote Management**: Display a curated list of programming-related anecdotes
- **Voting System**: Users can vote on anecdotes to show appreciation
- **Create New Anecdotes**: Add custom anecdotes to the collection
- **Automatic Sorting**: Anecdotes are sorted by vote count in descending order
- **React Query State Management**: Server state management with caching, background updates, and synchronization
- **Error Handling**: Robust error handling for failed API requests
- **Loading States**: Proper loading indicators during data fetching
- **Optimistic Updates**: Immediate UI feedback with rollback on errors
- **Notification System**: Context-based notification system for user feedback

## Prerequisites

- Node.js (v16 or higher)
- pnpm (or npm/yarn)

## Installation

1. Install dependencies:

```bash
pnpm install
```

## Usage

1. Start the JSON server (mock backend):

```bash
pnpm run server
```

2. In a separate terminal, start the development server:

```bash
pnpm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

4. Vote on existing anecdotes or create new ones

## Project Structure

```
anecdotes-query/
├── src/
│   ├── components/
│   │   ├── AnecdoteForm.jsx     # Form for creating new anecdotes
│   │   └── Notification.jsx     # Notification display component
│   ├── context/
│   │   ├── NotifHook.jsx        # Custom hook for notification context
│   │   └── NotificationContext.jsx # Notification context provider
│   ├── services/
│   │   └── anecdotesService.js  # API service functions
│   ├── App.jsx                  # Main application component
│   └── main.jsx                 # Application entry point with React Query client
├── db.json                      # Mock data for JSON server
├── server.js                    # JSON server configuration
├── package.json
└── README.md
```

## React Query Implementation

### Query Client Setup
The application uses `QueryClient` with default options for caching and error handling.

### Data Fetching
- **useQuery**: Fetches all anecdotes with error handling and retry logic
- **useMutation**: Handles voting updates with optimistic updates
- **Query Invalidation**: Manual cache updates for immediate UI feedback

### State Management
Server state is managed through React Query:
- **Caching**: Automatic caching of API responses
- **Background Updates**: Refetching data in the background
- **Stale-While-Revalidate**: Serving cached data while fetching fresh data
- **Optimistic Updates**: Immediate UI updates with rollback on errors

## Technologies Used

- **React 19** - Modern React with functional components and hooks
- **TanStack Query 5** - Powerful data synchronization for React
- **JSON Server** - Mock REST API for development
- **Axios** - HTTP client for API requests
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and quality

## Key Concepts Demonstrated

This React Query application introduces:

- **QueryClient**: Centralized configuration for data fetching
- **useQuery**: Declarative data fetching with loading, error, and data states
- **useMutation**: Handling create/update/delete operations
- **Query Keys**: Unique identifiers for caching and invalidation
- **Optimistic Updates**: Immediate UI feedback with error rollback
- **Context API**: Custom notification system using React Context
- **Custom Hooks**: Encapsulating complex logic in reusable hooks
- **Error Boundaries**: Graceful error handling and user feedback
- **Server State vs Client State**: Separation of concerns between different state types

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run server` - Start JSON server for mock API
- `pnpm run build` - Build for production
- `pnpm run lint` - Run ESLint
- `pnpm run preview` - Preview production build

## API Endpoints

The application uses JSON Server to provide REST endpoints:

- `GET /anecdotes` - Fetch all anecdotes
- `POST /anecdotes` - Create new anecdote
- `PUT /anecdotes/:id` - Update existing anecdote

## React Query Flow

1. **Initial Load**: `useQuery` fetches anecdotes and caches the response
2. **User Interaction**: Voting triggers `useMutation` with optimistic update
3. **Cache Update**: Query cache is updated immediately for instant feedback
4. **API Call**: Background mutation updates the server
5. **Error Handling**: On failure, cache is rolled back and error is displayed
6. **Success Confirmation**: Notification shows success message

This implementation showcases the power of React Query for managing server state: automatic caching, synchronization, and excellent developer experience with minimal boilerplate code.
