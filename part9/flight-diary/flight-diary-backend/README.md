# Flight Diary Backend (Part 9)

A Node.js Express backend with TypeScript for a flight diary system. This backend demonstrates TypeScript integration with Express, providing RESTful API endpoints with strong typing, data validation, and comprehensive TypeScript patterns for backend development.

## Features

- **TypeScript Integration**: Complete TypeScript implementation with Express
- **RESTful API**: Well-designed API endpoints with TypeScript
- **Flight Management**: CRUD operations for flight entries
- **Data Validation**: Type-safe request validation
- **Express with TypeScript**: Modern Express patterns with TypeScript
- **TypeScript Interfaces**: Strong typing for API contracts
- **Error Handling**: TypeScript-enhanced error handling
- **Environment Configuration**: Secure configuration management

## Prerequisites

- Node.js (v16 or higher)
- pnpm (or npm/yarn)
- TypeScript (v4.9 or higher)

## Installation

1. Install dependencies:

```bash
pnpm install
```

2. Create a `.env` file in the root directory (if needed):

```
PORT=3001
# Add other environment variables as needed
```

## Usage

1. Start the Express server:

```bash
pnpm run dev
```

2. The server will start on `http://localhost:3001`

3. API endpoints will be available for flight management

## Project Structure

```
flight-diary-backend/
├── src/
│   ├── routes/
│   │   └── flights.ts         # Flight API routes with TypeScript
│   ├── types/
│   │   └── flightTypes.ts     # TypeScript type definitions
│   ├── utils/
│   │   └── validation.ts      # TypeScript validation utilities
│   ├── app.ts                 # Express app configuration
│   └── index.ts               # Server entry point
├── data/
│   └── flights.json           # Flight data storage
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

// API response types
export interface ApiResponse<T> {
  data: T;
  error?: string;
}
```

## Express Routes with TypeScript

### Flight Routes
```typescript
import express from 'express';
import { FlightEntry, NewFlightEntry, Weather, Visibility } from '../types/flightTypes';
import { validateFlightEntry } from '../utils/validation';

const router = express.Router();
let flights: FlightEntry[] = [];

// Get all flights
router.get('/', (req, res) => {
  res.json(flights);
});

// Get flight by ID
router.get('/:id', (req, res) => {
  const flight = flights.find(f => f.id === req.params.id);
  if (!flight) {
    return res.status(404).json({ error: 'Flight not found' });
  }
  res.json(flight);
});

// Create new flight
router.post('/', (req, res) => {
  try {
    const newFlight: NewFlightEntry = req.body;

    // Validate flight entry
    const validationError = validateFlightEntry(newFlight);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const flight: FlightEntry = {
      id: generateId(),
      ...newFlight
    };

    flights.push(flight);
    res.status(201).json(flight);
  } catch (error) {
    res.status(400).json({ error: 'Invalid flight data' });
  }
});

// Delete flight
router.delete('/:id', (req, res) => {
  const initialLength = flights.length;
  flights = flights.filter(f => f.id !== req.params.id);

  if (flights.length === initialLength) {
    return res.status(404).json({ error: 'Flight not found' });
  }

  res.status(204).end();
});

export default router;
```

## Validation Utilities

```typescript
export const validateFlightEntry = (entry: NewFlightEntry): string | null => {
  if (!entry.date) {
    return 'Date is required';
  }

  if (!isValidDate(entry.date)) {
    return 'Invalid date format';
  }

  if (!Object.values(Weather).includes(entry.weather)) {
    return 'Invalid weather value';
  }

  if (!Object.values(Visibility).includes(entry.visibility)) {
    return 'Invalid visibility value';
  }

  return null;
};

const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};
```

## Express App Configuration

```typescript
import express from 'express';
import cors from 'cors';
import flightRouter from './routes/flights';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/flights', flightRouter);

// Health check endpoint
app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Error handling middleware
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(error.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app;
```

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express** - Web framework for Node.js
- **TypeScript 5** - Strong typing and type safety
- **CORS** - Cross-origin resource sharing
- **ESLint** - Code linting with TypeScript support
- **Nodemon** - Auto-reload during development
- **TypeScript Interfaces** - Strong typing for API contracts

## Key Concepts Demonstrated

This TypeScript Express backend demonstrates:

- **TypeScript Integration**: Complete TypeScript setup with Express
- **RESTful API Design**: Well-structured API endpoints
- **Request Validation**: Type-safe input validation
- **Error Handling**: Comprehensive error handling patterns
- **TypeScript Interfaces**: Strong typing for data contracts
- **Express Middleware**: TypeScript-enhanced middleware
- **Route Organization**: Modular route structure
- **Environment Configuration**: Secure configuration management

## TypeScript Best Practices

### Type Definition Patterns
```typescript
// Interface for request with TypeScript
interface TypedRequest<T> extends express.Request {
  body: T;
}

// Type for Express error handling
type ErrorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => void;

// Utility types for API responses
type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};
```

### Express Usage with TypeScript
```typescript
// Type-safe route handler
const getFlightById: express.RequestHandler = (req, res) => {
  const flightId = req.params.id;
  const flight = flights.find(f => f.id === flightId);

  if (!flight) {
    res.status(404).json({ error: 'Flight not found' });
    return;
  }

  res.json(flight);
};

// Type-safe error handling
const errorHandler: ErrorHandler = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}]`, err.message);
  res.status(500).json({ error: 'Internal server error' });
};
```

## Available Scripts

- `pnpm run dev` - Start development server with auto-reload
- `pnpm run build` - Build TypeScript to JavaScript
- `pnpm run start` - Start production server
- `pnpm run lint` - Run ESLint with TypeScript rules

## API Endpoints

### GET /api/flights
Get all flight entries

**Response:**
```json
[
  {
    "id": "1",
    "date": "2023-01-15",
    "weather": "sunny",
    "visibility": "great",
    "comment": "Smooth flight"
  }
]
```

### POST /api/flights
Create a new flight entry

**Request Body:**
```json
{
  "date": "2023-01-15",
  "weather": "sunny",
  "visibility": "great",
  "comment": "Smooth flight"
}
```

**Response:**
```json
{
  "id": "2",
  "date": "2023-01-15",
  "weather": "sunny",
  "visibility": "great",
  "comment": "Smooth flight"
}
```

### DELETE /api/flights/:id
Delete a flight entry

**Response:** 204 No Content

## Development Features

- **Hot Reload**: Automatic server restart on file changes
- **TypeScript Ready**: Full TypeScript configuration
- **Error Logging**: Comprehensive error logging
- **API Testing**: Ready for Postman/Insomnia testing
- **Environment Configuration**: Secure environment variable handling
- **Modular Architecture**: Separated concerns across files

## TypeScript Configuration

The project includes comprehensive TypeScript configuration:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false,
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

This TypeScript Express backend showcases modern backend development with strong typing, demonstrating how TypeScript enhances Express development with better tooling, error prevention, and maintainability.
