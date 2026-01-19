# Patientor Backend (Part 9)

A Node.js Express backend with TypeScript for a patient management system. This backend demonstrates TypeScript integration with Express for healthcare applications, providing RESTful API endpoints with strong typing, complex data validation, and comprehensive TypeScript patterns for medical data management.

## Features

- **TypeScript Integration**: Complete TypeScript implementation with Express
- **Healthcare API**: RESTful API endpoints for patient management
- **Patient Management**: CRUD operations for patient records
- **Medical Data**: Type-safe handling of healthcare information
- **Complex Validation**: TypeScript-enhanced data validation
- **Express with TypeScript**: Modern Express patterns with TypeScript
- **TypeScript Interfaces**: Strong typing for healthcare data contracts
- **Error Handling**: Comprehensive error handling for medical applications

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

3. API endpoints will be available for patient and diagnosis management

## Project Structure

```
patientor-backend/
├── src/
│   ├── routes/
│   │   ├── patients.ts        # Patient API routes with TypeScript
│   │   └── diagnoses.ts       # Diagnosis API routes with TypeScript
│   ├── types/
│   │   ├── patientTypes.ts    # Patient type definitions
│   │   ├── diagnosisTypes.ts  # Diagnosis type definitions
│   │   └── entryTypes.ts      # Medical entry type definitions
│   ├── utils/
│   │   ├── validation.ts      # TypeScript validation utilities
│   │   └── data.ts            # Sample data utilities
│   ├── app.ts                 # Express app configuration
│   └── index.ts               # Server entry point
├── data/
│   ├── patients.json          # Patient data storage
│   └── diagnoses.json         # Diagnosis data storage
├── package.json
└── README.md
```

## TypeScript Type Definitions

### Patient Types
```typescript
// Gender enum
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

// Base entry interface
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

// Health check rating
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

// Entry types
interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

// Union type for all entries
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

// Patient interface
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

// Patient without sensitive data
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

// New patient form data
export type NewPatient = Omit<Patient, 'id'>;
```

### Diagnosis Types
```typescript
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}
```

## Express Routes with TypeScript

### Patient Routes
```typescript
import express from 'express';
import { Patient, PublicPatient, NewPatient, Gender } from '../types/patientTypes';
import { validatePatient, validateEntry } from '../utils/validation';

const router = express.Router();
let patients: Patient[] = [];

// Get all patients (public data)
router.get('/', (req, res) => {
  const publicPatients: PublicPatient[] = patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
  res.json(publicPatients);
});

// Get patient by ID (full data)
router.get('/:id', (req, res) => {
  const patient = patients.find(p => p.id === req.params.id);
  if (!patient) {
    return res.status(404).json({ error: 'Patient not found' });
  }
  res.json(patient);
});

// Create new patient
router.post('/', (req, res) => {
  try {
    const newPatient: NewPatient = req.body;

    // Validate patient data
    const validationError = validatePatient(newPatient);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const patient: Patient = {
      id: generateId(),
      ...newPatient,
      entries: []
    };

    patients.push(patient);
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ error: 'Invalid patient data' });
  }
});

// Add entry to patient
router.post('/:id/entries', (req, res) => {
  try {
    const patient = patients.find(p => p.id === req.params.id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const newEntry = req.body;
    const validationError = validateEntry(newEntry);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const entry = {
      id: generateId(),
      ...newEntry
    };

    patient.entries.push(entry);
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ error: 'Invalid entry data' });
  }
});

export default router;
```

### Diagnosis Routes
```typescript
import express from 'express';
import { Diagnosis } from '../types/diagnosisTypes';

const router = express.Router();
let diagnoses: Diagnosis[] = [];

// Get all diagnoses
router.get('/', (req, res) => {
  res.json(diagnoses);
});

// Add new diagnosis
router.post('/', (req, res) => {
  try {
    const newDiagnosis: Diagnosis = req.body;
    diagnoses.push(newDiagnosis);
    res.status(201).json(newDiagnosis);
  } catch (error) {
    res.status(400).json({ error: 'Invalid diagnosis data' });
  }
});

export default router;
```

## Validation Utilities

```typescript
export const validatePatient = (patient: NewPatient): string | null => {
  if (!patient.name || patient.name.length < 3) {
    return 'Name must be at least 3 characters';
  }

  if (!isValidDate(patient.dateOfBirth)) {
    return 'Invalid date of birth';
  }

  if (!patient.ssn || !isValidSsn(patient.ssn)) {
    return 'Invalid SSN format';
  }

  if (!Object.values(Gender).includes(patient.gender)) {
    return 'Invalid gender value';
  }

  if (!patient.occupation || patient.occupation.length < 3) {
    return 'Occupation must be at least 3 characters';
  }

  return null;
};

export const validateEntry = (entry: any): string | null => {
  if (!entry.description || entry.description.length < 5) {
    return 'Description must be at least 5 characters';
  }

  if (!isValidDate(entry.date)) {
    return 'Invalid date';
  }

  if (!entry.specialist || entry.specialist.length < 3) {
    return 'Specialist must be at least 3 characters';
  }

  // Type-specific validation
  switch (entry.type) {
    case 'HealthCheck':
      if (entry.healthCheckRating === undefined ||
          !Object.values(HealthCheckRating).includes(entry.healthCheckRating)) {
        return 'Invalid health check rating';
      }
      break;
    case 'Hospital':
      if (!entry.discharge || !entry.discharge.date || !entry.discharge.criteria) {
        return 'Hospital entry requires discharge information';
      }
      break;
    case 'OccupationalHealthcare':
      if (!entry.employerName || entry.employerName.length < 3) {
        return 'Employer name must be at least 3 characters';
      }
      break;
    default:
      return 'Invalid entry type';
  }

  return null;
};

const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

const isValidSsn = (ssn: string): boolean => {
  return /^\d{6}[-+A]\d{4}$/.test(ssn);
};
```

## Express App Configuration

```typescript
import express from 'express';
import cors from 'cors';
import patientRouter from './routes/patients';
import diagnosisRouter from './routes/diagnoses';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnosisRouter);

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
- **TypeScript Interfaces** - Strong typing for healthcare data contracts

## Key Concepts Demonstrated

This TypeScript Express backend demonstrates:

- **TypeScript Integration**: Complete TypeScript setup with Express
- **Healthcare API Design**: RESTful endpoints for medical data
- **Complex Data Validation**: Type-safe validation for healthcare data
- **Error Handling**: Comprehensive error handling patterns
- **TypeScript Interfaces**: Strong typing for medical data contracts
- **Express Middleware**: TypeScript-enhanced middleware
- **Route Organization**: Modular route structure for healthcare
- **Sensitive Data Handling**: Proper handling of medical information

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

// Utility types for healthcare data
type PatientWithoutSensitiveData = Omit<Patient, 'ssn' | 'entries'>;
```

### Express Usage with TypeScript
```typescript
// Type-safe route handler for patient data
const getPatientHandler: express.RequestHandler = (req, res) => {
  const patientId = req.params.id;
  const patient = patients.find(p => p.id === patientId);

  if (!patient) {
    res.status(404).json({ error: 'Patient not found' });
    return;
  }

  // Return public patient data by default
  const { ssn, entries, ...publicData } = patient;
  res.json(publicData);
};

// Type-safe error handling for healthcare
const healthcareErrorHandler: ErrorHandler = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Healthcare API Error:`, err.message);
  res.status(500).json({ error: 'Healthcare service error' });
};
```

## Available Scripts

- `pnpm run dev` - Start development server with auto-reload
- `pnpm run build` - Build TypeScript to JavaScript
- `pnpm run start` - Start production server
- `pnpm run lint` - Run ESLint with TypeScript rules

## API Endpoints

### GET /api/patients
Get all patients (public data only)

**Response:**
```json
[
  {
    "id": "1",
    "name": "John Doe",
    "dateOfBirth": "1980-01-15",
    "gender": "male",
    "occupation": "Developer"
  }
]
```

### GET /api/patients/:id
Get patient by ID (full data including sensitive information)

**Response:**
```json
{
  "id": "1",
  "name": "John Doe",
  "dateOfBirth": "1980-01-15",
  "ssn": "123456-789A",
  "gender": "male",
  "occupation": "Developer",
  "entries": []
}
```

### POST /api/patients
Create a new patient

**Request Body:**
```json
{
  "name": "Jane Smith",
  "dateOfBirth": "1990-05-20",
  "ssn": "123456-789B",
  "gender": "female",
  "occupation": "Doctor"
}
```

**Response:**
```json
{
  "id": "2",
  "name": "Jane Smith",
  "dateOfBirth": "1990-05-20",
  "ssn": "123456-789B",
  "gender": "female",
  "occupation": "Doctor",
  "entries": []
}
```

### GET /api/diagnoses
Get all diagnoses

**Response:**
```json
[
  {
    "code": "M12.3",
    "name": "Osteoarthritis",
    "latin": "Arthrosis"
  }
]
```

## Development Features

- **Hot Reload**: Automatic server restart on file changes
- **TypeScript Ready**: Full TypeScript configuration
- **Error Logging**: Comprehensive error logging
- **API Testing**: Ready for Postman/Insomnia testing
- **Environment Configuration**: Secure environment variable handling
- **Modular Architecture**: Separated concerns across files
- **Healthcare Data Patterns**: TypeScript patterns for medical data

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

This TypeScript Express backend showcases modern healthcare application development with strong typing, demonstrating how TypeScript enhances Express development for medical data management, patient records, and healthcare API design.
