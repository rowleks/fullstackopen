# Routed Anecdotes (Part 7)

A React application demonstrating client-side routing with React Router. This project showcases navigation between different views, parameterized routes, and programmatic navigation in a single-page application, building upon the basic anecdotes app with routing capabilities.

## Features

- **Client-Side Routing**: React Router implementation for SPA navigation
- **Parameterized Routes**: Dynamic routes with URL parameters (`/anecdotes/:id`)
- **Programmatic Navigation**: Conditional redirects and navigation triggers
- **Route-Based Components**: Different components for different routes
- **Notification System**: Temporary notifications for user actions
- **Form Handling**: Create new anecdotes with form validation
- **Modern Navigation**: Link components and navigation hooks

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

3. Navigate between different sections using the menu links

4. Create new anecdotes and view individual anecdote details

## Project Structure

```
routed-anecdotes/
├── src/
│   ├── components/
│   │   ├── Menu.jsx           # Navigation menu component
│   │   ├── AnecdoteList.jsx   # List of all anecdotes
│   │   ├── Anecdote.jsx       # Individual anecdote display
│   │   ├── CreateNew.jsx      # Form for creating new anecdotes
│   │   ├── About.jsx          # About page component
│   │   └── Footer.jsx         # Footer component
│   ├── App.jsx                # Main application with routing
│   └── main.jsx               # Application entry point
├── public/
│   └── vite.svg
├── package.json
└── README.md
```

## Routing Structure

The application defines several routes:

```
/                     # Home - Anecdote list
/anecdotes/:id         # Individual anecdote details
/create               # Create new anecdote form
/about                # About page
```

## Route Components

### App.jsx - Main Router
```javascript
import { Routes, Route, useMatch } from 'react-router-dom'

const App = () => {
  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(a => a.id === Number(match.params.id))
    : null

  return (
    <Routes>
      <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
      <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
      <Route path="/create" element={<CreateNew addNew={addNew} />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}
```

### Menu.jsx - Navigation
```javascript
import { Link } from 'react-router-dom'

const Menu = () => (
  <nav>
    <Link to="/">anecdotes</Link>
    <Link to="/create">create new</Link>
    <Link to="/about">about</Link>
  </nav>
)
```

## Key Concepts Demonstrated

This routing application introduces:

- **Route Configuration**: Defining routes with `Routes` and `Route` components
- **URL Parameters**: Accessing route parameters with `useMatch` hook
- **Navigation**: Declarative navigation with `Link` components
- **Conditional Rendering**: Showing different content based on current route
- **Programmatic Navigation**: Redirects and navigation triggers
- **Route Matching**: Finding data based on URL parameters

## React Router Hooks

### useMatch
Used to match the current URL against a pattern and extract parameters:

```javascript
const match = useMatch('/anecdotes/:id')
if (match) {
  const id = Number(match.params.id)
  // Find anecdote by id
}
```

### Link Component
Declarative navigation without page reload:

```javascript
<Link to="/anecdotes/1">View Anecdote</Link>
```

## Technologies Used

- **React 18** - Modern React with functional components
- **React Router 7** - Declarative routing for React
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and quality

## Route-Based Architecture

### Component Organization
- **Route-specific components**: Each route has its own component
- **Shared components**: Menu and Footer appear on all pages
- **Data flow**: Props passed down to route components

### State Management
- **Local state**: Anecdotes stored in component state
- **URL state**: Current route reflected in URL
- **Temporary state**: Notifications with automatic cleanup

## Advanced Routing Patterns

### Parameterized Routes
```javascript
// Route definition
<Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />

// Parameter extraction
const match = useMatch('/anecdotes/:id')
const anecdote = anecdotes.find(a => a.id === Number(match.params.id))
```

### Conditional Navigation
```javascript
// Programmatic redirect after action
const addNew = (anecdote) => {
  // Add anecdote logic
  // Show notification
  setTimeout(() => setNotification(''), 5000)
}
```

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run lint` - Run ESLint
- `pnpm run preview` - Preview production build

## Learning Objectives

By studying this project, you will learn:

- How to implement client-side routing in React applications
- Creating parameterized routes for dynamic content
- Using React Router hooks for navigation and route matching
- Organizing components around routing structure
- Managing application state with URL routing
- Building multi-page experiences in single-page applications

## Best Practices Demonstrated

- **Declarative Routing**: Routes defined as JSX components
- **URL-first Design**: Application state reflected in URLs
- **Component Separation**: Route-specific components for maintainability
- **Parameter Validation**: Safe parameter extraction and validation
- **User Experience**: Smooth navigation without page reloads

## Routing Flow

1. **User clicks link** → React Router updates URL
2. **Route matches** → Corresponding component renders
3. **Parameters extracted** → Data fetched based on URL
4. **Component displays** → Content based on current route
5. **Navigation continues** → Seamless SPA experience

This project provides a solid foundation for building complex React applications with multiple views and client-side routing.