# Flight Diary Frontend (Part 9)

A React TypeScript frontend application for a flight diary system. This application demonstrates TypeScript integration with React for form handling, data validation, and UI components, providing a comprehensive example of TypeScript in modern frontend development.

## Features

- **TypeScript Integration**: Complete TypeScript implementation with React
- **Flight Management**: Add, view, and manage flight entries with TypeScript
- **Form Validation**: Type-safe form handling and validation
- **Weather and Visibility**: TypeScript enums for weather conditions and visibility
- **Modern React Patterns**: Hooks and functional components with TypeScript
- **Vite Integration**: Fast development with Vite and TypeScript support
- **ESLint Configuration**: TypeScript-aware linting rules
- **Responsive Design**: Modern UI with CSS modules

## Prerequisites

- Node.js (v16 or higher)
- pnpm (or npm/yarn)
- TypeScript (v4.9 or higher)
- Flight Diary Backend running (for full functionality)

## Installation

1. Install dependencies:

```bash
pnpm install
```

## Usage

1. Ensure the backend (flight-diary-backend) is running

2. Start the development server:

```bash
pnpm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

4. Add flight entries with weather conditions and visibility ratings

## Project Structure

```
flight-diary-frontend/
├── src/
│   ├── components/
│   │   ├── FlightForm.tsx     # TypeScript flight entry form
│   │   ├── FlightList.tsx     # Flight entries display
│   │   ├── WeatherSelect.tsx  # Weather selection component
│   │   └── VisibilitySelect.tsx # Visibility selection component
│   ├── types/
│   │   └── flightTypes.ts     # TypeScript type definitions
│   ├── services/
│   │   └── flightService.ts   # API service with TypeScript
│   ├── App.tsx                # Main app with TypeScript
│   ├── main.tsx               # Application entry point
│   └── styles.css             # Global styles
├── public/
│   └── vite.svg
├── package.json
└── README.md
```

## TypeScript Type Definitions

### Flight Types
```typescript
// Weather conditions enum
export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy"
}

// Visibility ratings enum
export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor"
}

// Flight entry interface
export interface FlightEntry {
  id: string;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

// New flight entry form data
export interface NewFlightEntry {
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}
```

## TypeScript Components

### FlightForm Component
```typescript
interface FlightFormProps {
  onSubmit: (entry: NewFlightEntry) => void;
}

const FlightForm: React.FC<FlightFormProps> = ({ onSubmit }) => {
  const [date, setDate] = useState<string>('');
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ date, weather, visibility, comment });
    setDate('');
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <WeatherSelect value={weather} onChange={setWeather} />
      <VisibilitySelect value={visibility} onChange={setVisibility} />

      <div>
        <label>Comment:</label>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <button type="submit">Add Flight</button>
    </form>
  );
};
```

### FlightList Component
```typescript
interface FlightListProps {
  flights: FlightEntry[];
  onDelete: (id: string) => void;
}

const FlightList: React.FC<FlightListProps> = ({ flights, onDelete }) => {
  return (
    <div className="flight-list">
      <h2>Flight Entries</h2>
      {flights.length === 0 ? (
        <p>No flight entries yet. Add your first flight!</p>
      ) : (
        <ul>
          {flights.map((flight) => (
            <li key={flight.id}>
              <div>
                <strong>Date:</strong> {flight.date}
              </div>
              <div>
                <strong>Weather:</strong> {flight.weather}
              </div>
              <div>
                <strong>Visibility:</strong> {flight.visibility}
              </div>
              {flight.comment && (
                <div>
                  <strong>Comment:</strong> {flight.comment}
                </div>
              )}
              <button onClick={() => onDelete(flight.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
```

## API Service with TypeScript

```typescript
const baseUrl = 'http://localhost:3001/api/flights';

export const getAllFlights = async (): Promise<FlightEntry[]> => {
  const response = await axios.get<FlightEntry[]>(baseUrl);
  return response.data;
};

export const createFlight = async (newFlight: NewFlightEntry): Promise<FlightEntry> => {
  const response = await axios.post<FlightEntry>(baseUrl, newFlight);
  return response.data;
};

export const deleteFlight = async (id: string): Promise<void> => {
  await axios.delete(`${baseUrl}/${id}`);
};
```

## Technologies Used

- **React 19** - Modern React with hooks and TypeScript
- **TypeScript 5** - Strong typing and type safety
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API requests
- **ESLint** - Code linting with TypeScript support
- **CSS Modules** - Scoped CSS styling
- **React.FC** - TypeScript functional components

## Key Concepts Demonstrated

This TypeScript React application demonstrates:

- **TypeScript Integration**: Complete TypeScript setup with React
- **Enum Types**: Using TypeScript enums for weather and visibility
- **Form Handling**: Type-safe form components and validation
- **API Integration**: TypeScript interfaces for API contracts
- **Component Props**: Strongly typed component properties
- **Type Inference**: Leveraging TypeScript's type inference
- **Error Handling**: Type-safe error handling patterns
- **React Patterns**: Modern React with TypeScript typings

## TypeScript Best Practices

### Type Definition Patterns
```typescript
// Interface for props with optional fields
interface WeatherSelectProps {
  value: Weather;
  onChange: (value: Weather) => void;
  className?: string;
}

// Type for API responses
type ApiResponse<T> = {
  data: T;
  error?: string;
};

// Utility types for form validation
type FormErrors = {
  [key: string]: string | undefined;
};
```

### Component Usage with TypeScript
```typescript
const WeatherSelect: React.FC<WeatherSelectProps> = ({ value, onChange, className }) => {
  const weatherOptions = Object.values(Weather);

  return (
    <div className={className}>
      <label>Weather:</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Weather)}
      >
        {weatherOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
```

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run lint` - Run ESLint with TypeScript rules
- `pnpm run preview` - Preview production build

## Development Features

- **Hot Module Replacement**: Fast development with Vite
- **TypeScript Ready**: Full TypeScript configuration
- **Modern CSS**: CSS modules for scoped styling
- **Component Architecture**: Modular, reusable components
- **Type Safety**: Comprehensive type checking
- **ESLint Integration**: TypeScript-aware linting

## TypeScript Configuration

The project includes comprehensive TypeScript configuration:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

This TypeScript React application showcases modern frontend development with strong typing, demonstrating how TypeScript enhances React development for form handling, data validation, and API integration.
