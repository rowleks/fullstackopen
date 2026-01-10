# Country Hook (Part 7)

A React application demonstrating custom hooks for form handling and API data fetching. This project showcases how to create reusable hooks for common patterns like controlled form inputs and REST API consumption, making components cleaner and more maintainable.

## Features

- **Custom Form Hook**: `useField` hook for controlled input management
- **API Data Fetching**: `useCountry` hook for REST API integration
- **Error Handling**: Graceful error handling for failed API requests
- **Real-time Search**: Dynamic country lookup with user input
- **Clean Component Logic**: Separation of concerns with custom hooks
- **Modern React Patterns**: Functional components with hooks

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

3. Enter a country name in the search field to fetch and display country information

## Project Structure

```
country-hook/
├── src/
│   ├── components/
│   │   └── Country.jsx       # Country display component
│   ├── hooks/
│   │   └── index.js          # Custom hooks (useField, useCountry)
│   ├── App.jsx               # Main application component
│   └── index.jsx             # Application entry point
├── public/
│   └── vite.svg
├── package.json
└── README.md
```

## Custom Hooks

### useField
A reusable hook for managing form input state:

```javascript
import { useField } from './hooks'

const MyComponent = () => {
  const nameInput = useField('text')

  return (
    <div>
      <input {...nameInput} />
      <p>Current value: {nameInput.value}</p>
    </div>
  )
}
```

**Features:**
- Automatic state management for input value
- Built-in onChange handler
- Configurable input type
- Returns all necessary props for input element

### useCountry
A hook for fetching country data from the REST Countries API:

```javascript
import { useCountry } from './hooks'

const CountryInfo = ({ countryName }) => {
  const country = useCountry(countryName)

  if (!country) return <div>Loading...</div>
  if (country === {}) return <div>Country not found</div>

  return <div>{country.name.common}</div>
}
```

**Features:**
- Automatic API calls when country name changes
- Built-in loading and error states
- Caches results to prevent unnecessary requests
- Returns `null` during loading, `{}` for errors, or country data

## API Integration

The application uses the [REST Countries API](https://restcountries.com/) to fetch country information:

```javascript
const response = await axios.get(
  `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
)
```

**Country Data Structure:**
```javascript
{
  name: {
    common: "Finland",
    official: "Republic of Finland"
  },
  capital: ["Helsinki"],
  population: 5530719,
  languages: { fin: "Finnish", swe: "Swedish" },
  flags: { png: "https://..." },
  // ... more properties
}
```

## Technologies Used

- **React 18** - Modern React with hooks
- **Axios** - HTTP client for API requests
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and quality

## Key Concepts Demonstrated

This project focuses on custom hook patterns:

- **Hook Composition**: Building complex logic from simple hooks
- **Side Effects**: Managing API calls with `useEffect`
- **State Management**: Controlled inputs and async data fetching
- **Error Boundaries**: Handling API errors gracefully
- **Reusability**: Creating hooks that work across different components
- **Separation of Concerns**: Moving logic out of components into hooks

## Hook Design Patterns

### Controlled Input Pattern
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

### API Fetching Pattern
```javascript
const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      // Fetch logic here
    }
  }, [name])

  return country
}
```

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build

## Learning Objectives

By studying this project, you will learn:

- How to create custom hooks for reusable logic
- Managing asynchronous operations in custom hooks
- Building controlled form components
- Integrating REST APIs in React applications
- Handling loading and error states in custom hooks
- The principles of hook composition and reusability

## Best Practices Demonstrated

- **Single Responsibility**: Each hook has one clear purpose
- **Error Handling**: Proper error states and user feedback
- **Performance**: Avoiding unnecessary re-renders and API calls
- **Reusability**: Hooks that can be used in multiple components
- **Testing**: Logic separated from components for easier testing

This project serves as a foundation for understanding custom hooks and building maintainable React applications with clean, reusable logic.