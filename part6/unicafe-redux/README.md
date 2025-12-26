# Unicafe Redux (Part 6)

A feedback collection application built with React and Redux. This project demonstrates state management using Redux, including actions, reducers, and store integration with React components.

## Features

- **Feedback Collection**: Interactive buttons to categorize feedback as Good, Ok, or Bad
- **Real-time Statistics**: Live display of feedback counts that update immediately
- **Reset Functionality**: Ability to reset all statistics to zero with a single click
- **Redux State Management**: Centralized state management using Redux store and reducer pattern
- **Component Re-rendering**: Automatic UI updates when state changes via store subscriptions

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

3. Click the feedback buttons to increment counters and observe real-time updates

## Project Structure

```
unicafe-redux/
├── src/
│   ├── main.jsx                 # Application entry point with Redux store setup
│   └── reducers/
│       ├── counterReducer.js    # Redux reducer for feedback state
│       └── counterReducer.test.js # Unit tests for the reducer
├── package.json
└── README.md
```

## Redux Implementation

### State Structure
The application state is a simple object containing feedback counters:
```javascript
{
  good: 0,
  ok: 0,
  bad: 0
}
```

### Actions
- **GOOD**: Increment good feedback counter
- **OK**: Increment ok feedback counter
- **BAD**: Increment bad feedback counter
- **RESET**: Reset all counters to zero

### Reducer
A pure function that handles state updates immutably based on action types.

## Testing

Run the test suite to verify reducer functionality:

```bash
pnpm test
```

Tests cover:
- Initial state handling
- Action dispatching for GOOD, OK, BAD feedback
- State reset functionality
- Immutable state updates

## Technologies Used

- **React 19** - UI framework with modern hooks and features
- **Redux 5** - Predictable state container for JavaScript applications
- **Vite** - Fast build tool and development server
- **Vitest** - Modern testing framework with Jest compatibility

## Key Concepts Demonstrated

This project introduces Redux fundamentals including:

- **Actions**: Plain objects describing state changes (GOOD, OK, BAD, RESET)
- **Reducers**: Pure functions that handle state updates immutably
- **Store**: Centralized state container created with `createStore()`
- **Subscriptions**: Reacting to state changes with `store.subscribe()`
- **Dispatching**: Triggering state updates with `store.dispatch()`
- **State Selection**: Accessing current state with `store.getState()`
- **Testing Reducers**: Unit testing state logic in isolation

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run lint` - Run ESLint
- `pnpm run preview` - Preview production build
- `pnpm test` - Run test suite
