# Course Info Application

A React application that displays course information including course name, parts, and exercise counts. This project demonstrates basic React component structure and props passing.

## Features

- **Course Header**: Displays the course name
- **Course Content**: Lists all course parts with their names
- **Exercise Counts**: Shows the number of exercises for each course part
- **Total Exercises**: Calculates and displays the total number of exercises across all parts
- **Component Separation**: Organized into Header, Content, and Total components

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

## Project Structure

```
courseinfo/
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
- Props and prop passing
- Data rendering and display
- Component separation (Header, Content, Total components)
- Basic data aggregation (calculating totals)

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Run ESLint
