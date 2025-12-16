# Phonebook Backend (Part 3)

A RESTful API backend for the Phonebook application, built with Node.js, Express, and MongoDB. This backend provides the necessary endpoints for managing phonebook entries.

## Features

- **RESTful API**: Full CRUD operations for phonebook entries
- **MongoDB Integration**: Persistent data storage using MongoDB with Mongoose
- **Request Logging**: HTTP request logging with Morgan
- **Environment Variables**: Configuration through .env file
- **Build Scripts**: Includes scripts for building and deploying the frontend

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- pnpm (or npm/yarn)

## Installation

1. Install dependencies:

```bash
pnpm install
```

2. Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_uri
PORT=3001
```

## Usage

1. Start the development server:
```bash
pnpm dev
```

2. Start production server:
```bash
pnpm start
```

3. Build and deploy (includes frontend build):
```bash
pnpm run deploy:full
```

## API Endpoints

### Phonebook Entries
- `GET /api/persons` - Get all phonebook entries
- `GET /api/persons/:id` - Get a single phonebook entry by ID
- `POST /api/persons` - Create a new phonebook entry
- `PUT /api/persons/:id` - Update an existing phonebook entry
- `DELETE /api/persons/:id` - Delete a phonebook entry

### Info
- `GET /info` - Get information about the phonebook

## Development

### Scripts
- `pnpm dev` - Start the development server with watch mode
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm build:ui` - Build the frontend and copy to backend
- `pnpm deploy:full` - Build and deploy the application

### Environment Variables
- `MONGODB_URI`: MongoDB connection string
- `PORT`: Port to run the server on (default: 3001)

## Dependencies

- Express.js - Web framework
- MongoDB with Mongoose - Database
- dotenv - Environment variable management
- Morgan - HTTP request logger
