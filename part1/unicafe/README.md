# Unicafe Feedback Application

A React application for collecting and displaying customer feedback statistics. Users can submit good, neutral, or bad feedback, and the app displays comprehensive statistics including totals, averages, and percentages.

## Features

- **Feedback Collection**: Submit good, neutral, or bad feedback with button clicks
- **Statistics Display**: Real-time calculation and display of feedback statistics including:
  - Total count of each feedback type (good, neutral, bad)
  - Total number of feedback submissions
  - Average feedback score
  - Percentage of positive feedback
- **Conditional Rendering**: Displays "No feedback given" message when no feedback has been collected yet
- **Real-time Updates**: Statistics update instantly as feedback is submitted

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

3. Click the feedback buttons (good, neutral, bad) to submit feedback and view the updated statistics

## Project Structure

```
unicafe/
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

- Multiple state variables with `useState` hook
- Event handling and button clicks
- Conditional rendering
- Component composition
- Data calculations and formatting
- Real-time state updates

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Run ESLint
