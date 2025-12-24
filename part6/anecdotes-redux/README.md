# Redux Anecdotes (Part 6)

A React application that demonstrates Redux state management by managing a collection of programming anecdotes. Users can vote on existing anecdotes and create new ones, with all state managed through Redux.

## Features

- **Anecdote Management**: Display a curated list of programming-related anecdotes
- **Voting System**: Users can vote on anecdotes to show appreciation
- **Create New Anecdotes**: Add custom anecdotes to the collection
- **Automatic Sorting**: Anecdotes are sorted by vote count in descending order
- **Redux State Management**: Centralized state using Redux store and reducers
- **Action Creators**: Clean separation of action creation logic

## Prerequisites

- Node.js (v16 or higher)
- pnpm (or npm/yarn)

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

3. Vote on existing anecdotes or create new ones

## Project Structure

```
anecdotes-redux/
├── src/
│   ├── components/
│   │   ├── AnecdoteForm.jsx     # Form for creating new anecdotes
│   │   └── AnecdoteList.jsx     # Display and voting for anecdotes
│   ├── reducers/
│   │   └── anecdoteReducer.js   # Redux reducer with action creators
│   ├── App.jsx                  # Main application component
│   └── main.jsx                 # Application entry point with Redux store
├── package.json
└── README.md
```

## Redux Implementation

### State Structure
The application state is an array of anecdote objects:
```javascript
{
  content: "Programming quote",
  id: "unique_id",
  votes: 0
}
```

### Actions
- **VOTE**: Increment votes for a specific anecdote
- **CREATE**: Add a new anecdote to the collection

### Reducer
Handles state updates immutably using Redux patterns with action creators for clean separation of concerns.

## Technologies Used

- **React 19** - Modern React with functional components and hooks
- **Redux 5** - Predictable state container for JavaScript applications
- **React-Redux** - Official React bindings for Redux
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and quality

## Key Concepts Demonstrated

This Redux application introduces:

- **Redux Store**: Centralized state management with `createStore()`
- **Reducers**: Pure functions that handle state updates immutably
- **Action Creators**: Functions that return action objects for type safety
- **React-Redux Integration**: Using `Provider`, `useSelector`, and `useDispatch`
- **Component Architecture**: Separation of concerns between form and list components
- **State Sorting**: Dynamic sorting of state data in components
- **Event Handling**: Connecting user interactions to Redux actions

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run lint` - Run ESLint
- `pnpm run preview` - Preview production build

## Redux Flow

1. **User Interaction**: User clicks vote button or submits new anecdote
2. **Action Dispatch**: Component dispatches action using `useDispatch`
3. **Reducer Processing**: Reducer processes action and returns new state
4. **State Update**: Redux store updates and notifies subscribed components
5. **Re-render**: Components re-render with updated state from `useSelector`

This implementation showcases the core principles of Redux: predictable state updates, action-based state changes, and separation of state logic from UI components.
