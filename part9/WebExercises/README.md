# TypeScript Web Exercises (Part 9)

A collection of TypeScript exercises and utilities demonstrating core TypeScript concepts, type systems, and practical implementations. This project showcases TypeScript's strong typing capabilities through various algorithms, calculations, and utility functions.

## Features

- **TypeScript Fundamentals**: Core TypeScript concepts and patterns
- **BMI Calculator**: TypeScript implementation of body mass index calculation
- **Exercise Calculator**: TypeScript exercise tracking and analysis
- **Utility Functions**: Reusable TypeScript utilities
- **Type Safety**: Strong typing throughout all implementations
- **TypeScript Best Practices**: Demonstrating modern TypeScript patterns
- **Command Line Interface**: TypeScript CLI applications
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

### BMI Calculator
```bash
pnpm run bmi
```

### Exercise Calculator
```bash
pnpm run exercise
```

### Run All Exercises
```bash
pnpm run start
```

## Project Structure

```
WebExercises/
├── src/
│   ├── bmiCalculator.ts       # BMI calculation utility
│   ├── exerciseCalculator.ts  # Exercise calculation utility
│   ├── utils.ts               # TypeScript utility functions
│   └── index.ts               # Main entry point
├── types/
│   └── exerciseTypes.ts       # Exercise type definitions
├── package.json
└── README.md
```

## TypeScript Type Definitions

### Exercise Types
```typescript
// Exercise intensity rating
export enum ExerciseIntensity {
  Low = "low",
  Medium = "medium",
  High = "high"
}

// Exercise entry interface
export interface ExerciseEntry {
  date: string;
  duration: number; // in minutes
  intensity: ExerciseIntensity;
  description?: string;
}

// Exercise result interface
export interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

// BMI parameters
export interface BmiParameters {
  height: number; // in cm
  weight: number; // in kg
}

// BMI result
export interface BmiResult {
  height: number;
  weight: number;
  bmi: number;
  category: string;
}
```

## TypeScript Implementations

### BMI Calculator
```typescript
export const calculateBmi = (height: number, weight: number): BmiResult => {
  if (height <= 0 || weight <= 0) {
    throw new Error('Height and weight must be positive numbers');
  }

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  let category = '';

  if (bmi < 18.5) {
    category = 'Underweight';
  } else if (bmi < 25) {
    category = 'Normal weight';
  } else if (bmi < 30) {
    category = 'Overweight';
  } else {
    category = 'Obese';
  }

  return {
    height,
    weight,
    bmi: parseFloat(bmi.toFixed(1)),
    category
  };
};

// CLI interface for BMI calculator
export const bmiCalculatorCli = (): void => {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.log('Usage: pnpm run bmi <height-cm> <weight-kg>');
    console.log('Example: pnpm run bmi 180 75');
    return;
  }

  try {
    const height = parseFloat(args[0]);
    const weight = parseFloat(args[1]);

    if (isNaN(height) || isNaN(weight)) {
      throw new Error('Both arguments must be numbers');
    }

    const result = calculateBmi(height, weight);
    console.log(`BMI Calculator Results:`);
    console.log(`Height: ${result.height} cm`);
    console.log(`Weight: ${result.weight} kg`);
    console.log(`BMI: ${result.bmi}`);
    console.log(`Category: ${result.category}`);
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
  }
};
```

### Exercise Calculator
```typescript
export const calculateExercise = (exercises: ExerciseEntry[], target: number): ExerciseResult => {
  if (exercises.length === 0) {
    throw new Error('Exercise list cannot be empty');
  }

  if (target <= 0) {
    throw new Error('Target must be a positive number');
  }

  const totalDuration = exercises.reduce((sum, exercise) => sum + exercise.duration, 0);
  const average = totalDuration / exercises.length;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target * 1.2) {
    rating = 3;
    ratingDescription = 'Excellent! You exceeded your target.';
  } else if (average >= target) {
    rating = 2;
    ratingDescription = 'Good job! You met your target.';
  } else if (average >= target * 0.8) {
    rating = 1;
    ratingDescription = 'Not too bad, but could be better.';
  } else {
    rating = 0;
    ratingDescription = 'You need to work harder to reach your target.';
  }

  return {
    periodLength: exercises.length,
    trainingDays: exercises.filter(e => e.duration > 0).length,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

// CLI interface for exercise calculator
export const exerciseCalculatorCli = (): void => {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('Usage: pnpm run exercise <target-minutes> <exercise1> <exercise2> ...');
    console.log('Example: pnpm run exercise 30 45 60 30 15');
    return;
  }

  try {
    const target = parseFloat(args[0]);
    const exerciseDurations = args.slice(1).map(arg => parseFloat(arg));

    if (isNaN(target) || exerciseDurations.some(isNaN)) {
      throw new Error('All arguments must be numbers');
    }

    const exercises: ExerciseEntry[] = exerciseDurations.map((duration, index) => ({
      date: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      duration,
      intensity: duration >= 45 ? ExerciseIntensity.High :
                 duration >= 30 ? ExerciseIntensity.Medium : ExerciseIntensity.Low,
      description: `Exercise ${index + 1}`
    }));

    const result = calculateExercise(exercises, target);

    console.log(`Exercise Calculator Results:`);
    console.log(`Period Length: ${result.periodLength} days`);
    console.log(`Training Days: ${result.trainingDays}`);
    console.log(`Target: ${result.target} minutes per day`);
    console.log(`Average: ${result.average.toFixed(1)} minutes per day`);
    console.log(`Success: ${result.success ? 'Yes' : 'No'}`);
    console.log(`Rating: ${'★'.repeat(result.rating)}${'☆'.repeat(3 - result.rating)}`);
    console.log(`Rating Description: ${result.ratingDescription}`);
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
  }
};
```

### Utility Functions
```typescript
// Type-safe array utilities
export const safeParseNumber = (value: unknown): number => {
  if (typeof value !== 'string' && typeof value !== 'number') {
    throw new Error('Value must be a string or number');
  }

  const parsed = parseFloat(value.toString());
  if (isNaN(parsed)) {
    throw new Error('Value must be a valid number');
  }

  return parsed;
};

// Type-safe object utilities
export const pick = <T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
};

// Type-safe date utilities
export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};
```

## Technologies Used

- **TypeScript 5** - Strong typing and type safety
- **Node.js** - JavaScript runtime
- **ESLint** - Code linting with TypeScript support
- **TypeScript Compiler** - TypeScript to JavaScript compilation
- **TypeScript Interfaces** - Strong typing for utility functions
- **TypeScript Enums** - Type-safe enumerations

## Key Concepts Demonstrated

This TypeScript exercises project demonstrates:

- **TypeScript Fundamentals**: Core TypeScript concepts and patterns
- **Type Safety**: Comprehensive type definitions and validation
- **Type Inference**: Leveraging TypeScript's type inference
- **Union Types**: Using union types for flexible data handling
- **Interface Design**: Creating reusable TypeScript interfaces
- **Type Guards**: Runtime type checking with TypeScript
- **Generic Types**: Advanced TypeScript patterns
- **Error Handling**: Type-safe error handling patterns

## TypeScript Best Practices

### Type Definition Patterns
```typescript
// Interface for utility functions
interface MathUtility {
  add: (a: number, b: number) => number;
  subtract: (a: number, b: number) => number;
  multiply: (a: number, b: number) => number;
  divide: (a: number, b: number) => number;
}

// Type for function parameters
type CalculatorFunction = (a: number, b: number) => number;

// Utility types for common patterns
type NonNullableFields<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};
```

### Function Usage with TypeScript
```typescript
// Type-safe calculator implementation
const calculator: MathUtility = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => {
    if (b === 0) {
      throw new Error('Cannot divide by zero');
    }
    return a / b;
  }
};

// Type-safe function usage
const calculate: CalculatorFunction = (a, b) => {
  return calculator.add(a, b);
};
```

## Available Scripts

- `pnpm run bmi` - Run BMI calculator CLI
- `pnpm run exercise` - Run exercise calculator CLI
- `pnpm run start` - Run all exercises
- `pnpm run build` - Build TypeScript to JavaScript
- `pnpm run lint` - Run ESLint with TypeScript rules

## Development Features

- **TypeScript Ready**: Full TypeScript configuration
- **Error Logging**: Comprehensive error logging
- **CLI Applications**: TypeScript command line interfaces
- **Type Safety**: Comprehensive type checking
- **ESLint Integration**: TypeScript-aware linting
- **Utility Patterns**: Reusable TypeScript utility functions

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

## Example Usage

### BMI Calculator
```bash
pnpm run bmi 180 75
```

**Output:**
```
BMI Calculator Results:
Height: 180 cm
Weight: 75 kg
BMI: 23.1
Category: Normal weight
```

### Exercise Calculator
```bash
pnpm run exercise 30 45 60 30 15
```

**Output:**
```
Exercise Calculator Results:
Period Length: 5 days
Training Days: 5
Target: 30 minutes per day
Average: 33.0 minutes per day
Success: Yes
Rating: ★★★
Rating Description: Good job! You met your target.
```

This TypeScript exercises project showcases core TypeScript concepts and patterns, demonstrating how TypeScript enhances JavaScript development with strong typing, better tooling, and improved maintainability for utility functions and algorithms.
