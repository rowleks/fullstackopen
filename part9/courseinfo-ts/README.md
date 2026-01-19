# Course Information with TypeScript (Part 9)

A React application demonstrating TypeScript integration for a course information system. This project showcases TypeScript's strong typing capabilities with React components, props, and state management, providing a comprehensive example of TypeScript in frontend development.

## Features

- **TypeScript Integration**: Complete TypeScript implementation with React
- **Strong Typing**: Type-safe components, props, and state
- **Course Management**: Display and manage course information with TypeScript interfaces
- **Type-Safe Components**: React components with TypeScript type definitions
- **Modern React Patterns**: Hooks and functional components with TypeScript
- **Vite Integration**: Fast development with Vite and TypeScript support
- **ESLint Configuration**: TypeScript-aware linting rules
- **Type Inference**: Leveraging TypeScript's type inference capabilities

## Prerequisites

- Node.js (v16 or higher)
- pnpm (or npm/yarn)
- TypeScript (v4.9 or higher)

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

2. Open your browser and navigate to `http://localhost:5173`

3. Explore the course information interface with TypeScript-powered components

## Project Structure

```
courseinfo-ts/
├── src/
│   ├── components/
│   │   ├── CoursePart.tsx      # TypeScript course component
│   │   ├── Content.tsx         # Main content with TypeScript
│   │   ├── Header.tsx          # Header component with TypeScript
│   │   └── Total.tsx           # Total exercises with TypeScript
│   ├── types/
│   │   └── courseTypes.ts      # TypeScript type definitions
│   ├── App.tsx                 # Main app with TypeScript
│   ├── main.tsx                # Application entry point
│   └── styles.css              # Global styles
├── public/
│   └── vite.svg
├── package.json
└── README.md
```

## TypeScript Type Definitions

### Course Types
```typescript
// Basic course part interface
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

// Specific course part types
interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartBase {
  description: string;
  requirements: string[];
  kind: "special";
}

// Union type for all course parts
export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
```

## TypeScript Components

### CoursePart Component
```typescript
interface CoursePartProps {
  course: CoursePart;
}

const CoursePart: React.FC<CoursePartProps> = ({ course }) => {
  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
  };

  switch (course.kind) {
    case "basic":
      return (
        <div>
          <h3>{course.name}</h3>
          <p>{course.description}</p>
          <p>Exercises: {course.exerciseCount}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <h3>{course.name}</h3>
          <p>Exercises: {course.exerciseCount}</p>
          <p>Group projects: {course.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h3>{course.name}</h3>
          <p>{course.description}</p>
          <p>Background material: {course.backgroundMaterial}</p>
          <p>Exercises: {course.exerciseCount}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>{course.name}</h3>
          <p>{course.description}</p>
          <p>Required skills: {course.requirements.join(', ')}</p>
          <p>Exercises: {course.exerciseCount}</p>
        </div>
      );
    default:
      return assertNever(course);
  }
};
```

### Content Component
```typescript
interface ContentProps {
  courseParts: CoursePart[];
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map((part, index) => (
        <CoursePart key={index} course={part} />
      ))}
    </div>
  );
};
```

## Technologies Used

- **React 19** - Modern React with hooks and TypeScript
- **TypeScript 5** - Strong typing and type safety
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting with TypeScript support
- **CSS Modules** - Scoped CSS styling
- **React.FC** - TypeScript functional components

## Key Concepts Demonstrated

This TypeScript React application demonstrates:

- **TypeScript Integration**: Complete TypeScript setup with React
- **Union Types**: Using discriminated unions for different course types
- **Type Guards**: Runtime type checking with TypeScript
- **Interface Design**: Creating reusable TypeScript interfaces
- **Component Props**: Strongly typed component properties
- **Type Inference**: Leveraging TypeScript's type inference
- **Error Handling**: Type-safe error handling patterns
- **React Patterns**: Modern React with TypeScript typings

## TypeScript Best Practices

### Type Definition Patterns
```typescript
// Interface for props with optional fields
interface HeaderProps {
  name: string;
  title?: string;
}

// Type for complex data structures
type CourseData = {
  courses: CoursePart[];
  totalExercises: number;
};

// Utility types for common patterns
type NonNullableFields<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};
```

### Component Usage with TypeScript
```typescript
const Header: React.FC<HeaderProps> = ({ name, title = 'Course' }) => {
  return (
    <header>
      <h1>{title}</h1>
      <h2>{name}</h2>
    </header>
  );
};

// Usage with type checking
<Header name="Full Stack Open" title="Advanced Course" />
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

This TypeScript React application showcases modern frontend development with strong typing, demonstrating how TypeScript enhances React development with better tooling, error prevention, and maintainability.
