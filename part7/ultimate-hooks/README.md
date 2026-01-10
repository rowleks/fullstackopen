# Ultimate Hooks (Part 7)

An advanced React application showcasing complex custom hooks for resource management. This project demonstrates creating generic, reusable hooks for CRUD operations with external APIs, featuring sophisticated state management and error handling patterns.

## Features

- **Generic Resource Hook**: `useResource` hook for any REST API endpoint
- **Form Field Hook**: `useField` hook for controlled input management
- **Dual Resource Management**: Managing notes and persons with the same hook
- **JSON Server Integration**: Mock API for realistic backend simulation
- **Optimistic Updates**: Immediate UI feedback for user actions
- **Error Handling**: Comprehensive error states and recovery
- **Reusable Patterns**: Hooks that work across different data types

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

4. Add notes and persons using the forms - data persists via JSON server

## Project Structure

```
ultimate-hooks/
├── src/
│   ├── App.jsx               # Main application component
│   └── main.jsx              # Application entry point
├── db.json                   # Mock data for JSON server
├── package.json
└── README.md
```

## Custom Hooks

### useResource
A generic hook for managing REST API resources:

```javascript
const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl).then(response => {
      setResources(response.data)
    })
  }, [baseUrl])

  const create = (resource) => {
    axios.post(baseUrl, resource).then(response => {
      setResources(resources.concat(response.data))
    })
  }

  const service = { create }
  return [resources, service]
}
```

**Usage:**
```javascript
const [notes, noteService] = useResource('http://localhost:3005/notes')
const [persons, personService] = useResource('http://localhost:3005/persons')

// Create new resources
noteService.create({ content: 'New note' })
personService.create({ name: 'John', number: '123-456' })
```

### useField
A reusable hook for form input management:

```javascript
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}
```

**Usage:**
```javascript
const content = useField('text')
const name = useField('text')
const number = useField('text')

return (
  <input {...content} />
  <input {...name} />
  <input {...number} />
)
```

## API Endpoints

The application uses JSON Server to provide REST endpoints:

- `GET /notes` - Fetch all notes
- `POST /notes` - Create new note
- `GET /persons` - Fetch all persons
- `POST /persons` - Create new person

## Technologies Used

- **React 18** - Modern React with functional components
- **Axios** - HTTP client for API requests
- **JSON Server** - Mock REST API for development
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and quality

## Key Concepts Demonstrated

This advanced hooks project introduces:

- **Generic Hooks**: Creating hooks that work with any data type
- **Resource Management**: Abstracting CRUD operations into reusable hooks
- **API Integration**: Managing asynchronous operations in custom hooks
- **State Synchronization**: Keeping local state in sync with server state
- **Hook Composition**: Building complex behavior from simple hooks
- **Error Boundaries**: Handling API failures gracefully
- **Optimistic Updates**: Immediate UI feedback with server persistence

## Hook Design Patterns

### Resource Management Pattern
```javascript
const useResource = (baseUrl) => {
  // State for resources
  const [resources, setResources] = useState([])

  // Fetch on mount
  useEffect(() => { /* fetch logic */ }, [baseUrl])

  // CRUD operations
  const create = (resource) => { /* create logic */ }
  const update = (resource) => { /* update logic */ }
  const remove = (id) => { /* delete logic */ }

  return [resources, { create, update, remove }]
}
```

### Form Field Pattern
```javascript
const useField = (type, initialValue = '') => {
  const [value, setValue] = useState(initialValue)

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue(initialValue)
  }

  return {
    type,
    value,
    onChange,
    reset,
  }
}
```

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run server` - Start JSON server for mock API
- `pnpm run build` - Build for production
- `pnpm run lint` - Run ESLint
- `pnpm run preview` - Preview production build

## Advanced Hook Features

### Generic Resource Hook
- **Type Agnostic**: Works with any resource type (notes, persons, etc.)
- **Configurable Base URL**: Different endpoints for different resources
- **Extensible Operations**: Can be extended with update/delete operations
- **State Management**: Automatic state updates after operations

### Form Integration
- **Controlled Inputs**: All inputs properly controlled
- **Type Safety**: Configurable input types
- **Reset Capability**: Form clearing functionality
- **Validation Ready**: Structure ready for validation integration

## Learning Objectives

By studying this project, you will learn:

- How to create generic, reusable custom hooks
- Managing complex asynchronous operations in hooks
- Building abstractions for API resource management
- Implementing optimistic updates and error handling
- Creating hooks that work across different data domains
- Advanced patterns for hook composition and reusability

## Best Practices Demonstrated

- **Single Responsibility**: Each hook has a clear, focused purpose
- **Abstraction**: Complex API logic hidden behind simple interfaces
- **Reusability**: Hooks that work with different data types
- **Error Handling**: Proper error states and user feedback
- **Performance**: Efficient state updates and API calls
- **Maintainability**: Clean, testable hook implementations

## Data Flow Architecture

1. **User Interaction** → Form submission triggers hook method
2. **Hook Operation** → Custom hook handles API call
3. **State Update** → Local state updated optimistically
4. **Server Sync** → API call completes and confirms state
5. **UI Update** → Components re-render with new state

## Extension Possibilities

The `useResource` hook can be extended with:

- **Update Operations**: `service.update(id, resource)`
- **Delete Operations**: `service.remove(id)`
- **Query Parameters**: Support for filtering and pagination
- **Caching**: Built-in caching for better performance
- **Retry Logic**: Automatic retry on failed requests
- **Loading States**: Built-in loading indicators

This project demonstrates the power of custom hooks for creating sophisticated, reusable logic that can transform how you build React applications.