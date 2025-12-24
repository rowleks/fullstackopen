# Testing Bloglist Application (Part 5)

End-to-end testing setup for the Bloglist application using Playwright. This project demonstrates comprehensive testing of both frontend and backend components of a full-stack blog application.

## Features

- **End-to-End Testing**: Automated browser testing with Playwright
- **Multi-Browser Support**: Tests run on Chromium by default, extensible to Firefox and WebKit
- **Parallel Testing**: Configurable test execution with worker management
- **CI/CD Ready**: Optimized for continuous integration environments
- **Test Reporting**: HTML reports and screenshots for test results
- **Development Server Management**: Automatic startup of backend and frontend servers during testing

## Prerequisites

- Node.js (v16 or higher)
- pnpm (or npm/yarn)
- MongoDB (for backend testing)

## Installation

1. Install dependencies:

```bash
pnpm install
```

## Project Structure

```
part5/
├── bloglist-BE/              # Backend application (from Part 4)
├── bloglist-FE/              # Frontend application (from Part 4)
├── tests/                    # Playwright test files
├── playwright.config.js      # Playwright configuration
├── package.json
└── README.md
```

## Usage

1. Run tests:

```bash
pnpm test
```

2. View test reports:

```bash
pnpm test:report
```

## Testing Setup

The testing environment automatically starts:

- Backend server on port 3030 (test environment)
- Frontend development server on port 5173

Tests are configured to run against these local instances.

## Configuration

### Playwright Configuration

Key settings in `playwright.config.js`:

- **Base URL**: `http://localhost:5173` (frontend)
- **Timeout**: 5000ms per test
- **Retries**: 2 in CI, 0 locally
- **Workers**: 1 (sequential execution)
- **Browser**: Chromium desktop

### Environment Variables

Backend testing requires proper environment variables (configured in `bloglist-BE/.env`):

- `NODE_ENV=test`
- `PORT=3030`
- `TEST_MONGODB_URI=your_test_database_uri`

## Test Structure

Tests are located in the `tests/` directory and cover:

- User authentication flows
- Blog creation and management
- API interactions
- UI component behavior
- Error handling scenarios

## Available Scripts

- `pnpm test` - Run Playwright tests
- `pnpm test:report` - Show test report in browser

## Technologies Used

- **Playwright** - End-to-end testing framework
- **Node.js** - Runtime environment
- **React** - Frontend framework (tested application)
- **Express.js** - Backend framework (tested application)
- **MongoDB** - Database (tested application)

## Key Concepts Demonstrated

This part focuses on:

- End-to-end testing strategies
- Browser automation
- Test configuration and setup
- CI/CD integration
- Cross-browser testing principles
- Test reporting and debugging
