# Anecdotes Application

A React application that displays programming anecdotes and allows users to vote on them. The app shows a random anecdote each time you click "next anecdote" and tracks votes to determine the most popular anecdote.

## Features

- **Random Anecdote Display**: Shows a random programming anecdote from a collection
- **Next Anecdote**: Click to view a different random anecdote
- **Voting System**: Vote for your favorite anecdotes to increase their vote count
- **Top Anecdote Display**: Automatically displays the anecdote with the most votes
- **State Management**: Uses React's `useState` hook to manage selected anecdote and vote counts
- **Dynamic Updates**: Vote counts and top anecdote update in real-time

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

3. Click "next anecdote" to view random anecdotes and use the "vote" button to vote for your favorites

## Project Structure

```
anecdotes/
├── src/
│   ├── App.jsx                 # Main application component
│   └── main.jsx                # Application entry point
├── package.json
└── README.md
```

## Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool and development server
- **ESLint** - Code linting

## Key Concepts Demonstrated

This project demonstrates React fundamentals including:

- Component composition and structure
- State management with `useState` hook
- Event handling and user interactions
- Conditional rendering
- Array manipulation and finding maximum values
- Dynamic content display

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Run ESLint
