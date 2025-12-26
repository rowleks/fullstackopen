# Redux Anecdotes (Part 6)

A React application that demonstrates Redux Toolkit state management by managing a collection of programming anecdotes with server synchronization. Users can vote on existing anecdotes and create new ones, with all state managed through Redux Toolkit and persisted via JSON Server.

## Features

- **Anecdote Management**: Display a curated list of programming-related anecdotes
- **Voting System**: Users can vote on anecdotes to show appreciation
- **Create New Anecdotes**: Add custom anecdotes to the collection
- **Automatic Sorting**: Anecdotes are sorted by vote count in descending order
- **Redux Toolkit State Management**: Modern Redux with createSlice and RTK Query
- **Server Synchronization**: Persistent data storage with JSON Server
- **Notification System**: User feedback for actions
- **Optimistic Updates**: Immediate UI feedback with server persistence

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
anecdotes-redux/
├── src/
│   ├── components/
│   │   ├── AnecdoteForm.jsx     # Form for creating new anecdotes
│   │   ├── AnecdoteList.jsx     # Display and voting for anecdotes
│   │   ├── Filter.jsx           # Filter component for anecdotes
│   │   └── Notification.jsx     # Notification display component
│   ├── reducers/
│   │   ├── anecdoteReducer.js   # Redux Toolkit slice for anecdotes
│   │   ├── filterReducer.js     # Redux Toolkit slice for filtering
│   │   └── notificationReducer.js # Redux Toolkit slice for notifications
│   ├── services/
│   │   └── anecdotesService.js  # API service functions
│   ├── store.js                 # Redux store configuration
│   ├── App.jsx                  # Main application component
│   └── main.jsx                 # Application entry point with Redux Provider
├── db.json                      # Mock data for JSON server
├── requests/                    # REST client requests for testing
├── package.json
└── README.md
```

## Redux Toolkit Implementation

### State Structure
The application uses multiple slices for different concerns:
```javascript
// Anecdotes slice
{
  anecdotes: [
    {
      content: "Programming quote",
      id: "unique_id",
      votes: 0
    }
  ],
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

// Filter slice
{
  filter: ''
}

// Notification slice
{
  message: '',
  type: 'success' | 'error' | null
}
```

### Slices and Actions
- **anecdoteSlice**: Manages anecdotes array with createSlice
- **filterSlice**: Manages filter string for searching
- **notificationSlice**: Manages notification messages
- **Async Actions**: Server synchronization with createAsyncThunk

### Store Configuration
Combines multiple slices with configureStore for simplified setup.

## Technologies Used

- **React 19** - Modern React with functional components and hooks
- **Redux Toolkit 2** - Modern Redux with simplified API
- **React-Redux** - Official React bindings for Redux
- **JSON Server** - Mock REST API for development
- **Axios** - HTTP client for API requests
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and quality

## Key Concepts Demonstrated

This Redux Toolkit application introduces:

- **createSlice**: Simplified reducer and action creation
- **configureStore**: Modern store setup with dev tools
- **createAsyncThunk**: Handling async operations in Redux
- **Multiple Slices**: Separating concerns across different state domains
- **React-Redux Integration**: Using `Provider`, `useSelector`, and `useDispatch`
- **Server State Sync**: Combining Redux with API calls
- **Optimistic Updates**: Immediate UI feedback with server persistence
- **Component Architecture**: Separation of concerns with focused components

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

## Redux Toolkit Flow

1. **User Interaction**: User clicks vote button or submits new anecdote
2. **Action Dispatch**: Component dispatches action using `useDispatch`
3. **Async Thunk**: createAsyncThunk handles server communication
4. **Slice Processing**: Reducer processes action and updates state
5. **State Update**: Redux store updates and notifies subscribed components
6. **Re-render**: Components re-render with updated state from `useSelector`

This implementation showcases Redux Toolkit's modern approach: simplified boilerplate, built-in async handling, and excellent developer experience while maintaining Redux's core principles of predictable state updates.
