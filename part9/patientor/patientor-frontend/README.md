# Patientor Frontend (Part 9)

A React TypeScript frontend application for a patient management system. This application demonstrates TypeScript integration with React for healthcare data management, patient records, and complex state management, providing a comprehensive example of TypeScript in healthcare application development.

## Features

- **TypeScript Integration**: Complete TypeScript implementation with React
- **Patient Management**: View and manage patient records with TypeScript
- **Healthcare Data**: Type-safe handling of medical information
- **Complex State Management**: TypeScript-enhanced state patterns
- **Form Validation**: Type-safe form handling for patient data
- **Modern React Patterns**: Hooks and functional components with TypeScript
- **Vite Integration**: Fast development with Vite and TypeScript support
- **ESLint Configuration**: TypeScript-aware linting rules
- **Responsive Design**: Modern UI for healthcare applications

## Prerequisites

- Node.js (v16 or higher)
- pnpm (or npm/yarn)
- TypeScript (v4.9 or higher)
- Patientor Backend running (for full functionality)

## Installation

1. Install dependencies:

```bash
pnpm install
```

## Usage

1. Ensure the backend (patientor-backend) is running

2. Start the development server:

```bash
pnpm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

4. View and manage patient records with TypeScript-powered components

## Project Structure

```
patientor-frontend/
├── src/
│   ├── components/
│   │   ├── PatientList.tsx    # TypeScript patient list
│   │   ├── PatientDetails.tsx # Patient detail view
│   │   ├── AddPatientForm.tsx # Add patient form
│   │   ├── EntryForm.tsx      # Add medical entry form
│   │   └── DiagnosisList.tsx  # Diagnosis codes display
│   ├── types/
│   │   ├── patientTypes.ts    # Patient type definitions
│   │   ├── diagnosisTypes.ts  # Diagnosis type definitions
│   │   └── entryTypes.ts      # Medical entry type definitions
│   ├── services/
│   │   ├── patientService.ts  # Patient API service
│   │   └── diagnosisService.ts # Diagnosis API service
│   ├── state/
│   │   └── state.ts           # Application state management
│   ├── App.tsx                # Main app with TypeScript
│   ├── main.tsx               # Application entry point
│   └── styles.css             # Global styles
├── public/
│   └── vite.svg
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
```

### Diagnosis Types
```typescript
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}
```

## TypeScript Components

### PatientList Component
```typescript
interface PatientListProps {
  patients: Patient[];
  onSelect: (id: string) => void;
}

const PatientList: React.FC<PatientListProps> = ({ patients, onSelect }) => {
  return (
    <div className="patient-list">
      <h2>Patients</h2>
      {patients.length === 0 ? (
        <p>No patients found</p>
      ) : (
        <ul>
          {patients.map((patient) => (
            <li key={patient.id}>
              <button onClick={() => onSelect(patient.id)}>
                {patient.name} ({patient.gender})
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
```

### PatientDetails Component
```typescript
interface PatientDetailsProps {
  patient: Patient;
  diagnoses: Diagnosis[];
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ patient, diagnoses }) => {
  const getDiagnosisName = (code: string): string => {
    const diagnosis = diagnoses.find(d => d.code === code);
    return diagnosis ? diagnosis.name : 'Unknown diagnosis';
  };

  return (
    <div className="patient-details">
      <h2>{patient.name}</h2>
      <p>Date of Birth: {patient.dateOfBirth}</p>
      <p>SSN: {patient.ssn}</p>
      <p>Gender: {patient.gender}</p>
      <p>Occupation: {patient.occupation}</p>

      <h3>Entries</h3>
      {patient.entries.length === 0 ? (
        <p>No entries yet</p>
      ) : (
        <div className="entries">
          {patient.entries.map((entry) => (
            <div key={entry.id} className="entry">
              <p><strong>{entry.date}</strong> {entry.description}</p>
              <p>Specialist: {entry.specialist}</p>
              {entry.diagnosisCodes && (
                <div className="diagnoses">
                  <p>Diagnoses:</p>
                  <ul>
                    {entry.diagnosisCodes.map((code) => (
                      <li key={code}>
                        {code} - {getDiagnosisName(code)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
```

## API Services with TypeScript

```typescript
const baseUrl = 'http://localhost:3001/api';

export const getAllPatients = async (): Promise<Patient[]> => {
  const response = await axios.get<Patient[]>(`${baseUrl}/patients`);
  return response.data;
};

export const getPatientById = async (id: string): Promise<Patient> => {
  const response = await axios.get<Patient>(`${baseUrl}/patients/${id}`);
  return response.data;
};

export const addPatient = async (patientData: Omit<Patient, 'id'>): Promise<Patient> => {
  const response = await axios.post<Patient>(`${baseUrl}/patients`, patientData);
  return response.data;
};

export const getAllDiagnoses = async (): Promise<Diagnosis[]> => {
  const response = await axios.get<Diagnosis[]>(`${baseUrl}/diagnoses`);
  return response.data;
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
- **React Router** - Navigation between views

## Key Concepts Demonstrated

This TypeScript React application demonstrates:

- **TypeScript Integration**: Complete TypeScript setup with React
- **Union Types**: Using discriminated unions for different entry types
- **Complex State Management**: Type-safe state patterns
- **Healthcare Data Modeling**: TypeScript interfaces for medical data
- **Form Validation**: Type-safe form components
- **API Integration**: TypeScript interfaces for healthcare APIs
- **Component Props**: Strongly typed component properties
- **Type Inference**: Leveraging TypeScript's type inference

## TypeScript Best Practices

### Type Definition Patterns
```typescript
// Interface for props with complex types
interface AddPatientFormProps {
  onSubmit: (patient: Omit<Patient, 'id'>) => void;
  onCancel: () => void;
}

// Type for form validation errors
type FormErrors = {
  [key in keyof Omit<Patient, 'id'>]?: string;
};

// Utility types for healthcare data
type PatientWithoutSsn = Omit<Patient, 'ssn'>;
```

### Component Usage with TypeScript
```typescript
const AddPatientForm: React.FC<AddPatientFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [ssn, setSsn] = useState<string>('');
  const [gender, setGender] = useState<Gender>(Gender.Other);
  const [occupation, setOccupation] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPatient: Omit<Patient, 'id'> = {
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
      entries: []
    };

    onSubmit(newPatient);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields with TypeScript typing */}
    </form>
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
- **Healthcare Data Patterns**: TypeScript patterns for medical data

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

This TypeScript React application showcases modern healthcare application development with strong typing, demonstrating how TypeScript enhances React development for complex medical data management and patient record systems.
