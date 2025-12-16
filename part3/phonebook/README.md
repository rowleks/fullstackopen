# Phonebook (Part 3)

A React application for managing phone contacts, demonstrating the use of React hooks, forms, and communication with a backend server. The application allows users to add, view, and delete contacts with name and number information.

## Features

- **Contact List**: Displays all saved contacts with names and phone numbers
- **Add New Contacts**: Form to add new contacts with name and number
- **Delete Contacts**: Remove contacts from the phonebook
- **Search Functionality**: Filter contacts by name in real-time
- **Form Validation**: Prevents duplicate names and ensures proper phone number format
- **Error Handling**: Displays notifications for successful operations and errors
- **JSON Server Backend**: Uses a simple JSON server for data persistence

## Prerequisites

- Node.js (v16 or higher)
- pnpm (or npm/yarn)

## Installation

1. Install dependencies:

```bash
pnpm install
```

## Usage

1. Start the JSON Server backend (runs on port 3001):

```bash
pnpm run server
```

2. In a separate terminal, start the development server:

```bash
pnpm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## Project Structure

```
phonebook/
├── src/
│   ├── components/
│   │   ├── Filter.jsx          # Search/filter component
│   │   ├── PersonForm.jsx      # Form for adding new contacts
│   │   └── Persons.jsx         # List display component
│   ├── services/
│   │   └── contact.js          # API service for CRUD operations
│   ├── App.jsx                 # Main application component
│   ├── main.jsx                # Application entry point
│   └── style.css               # Application styles
├── db.json                     # JSON Server database
├── package.json
└── README.md
```

## Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool and development server
- **Axios** - HTTP client for API requests
- **JSON Server** - REST API backend for development
- **ESLint** - Code linting

## API Endpoints

The application communicates with a JSON Server running on `http://localhost:3001`:

- `GET /persons` - Retrieve all contacts
- `POST /persons` - Create a new contact
- `PUT /persons/:id` - Update a contact
- `DELETE /persons/:id` - Delete a contact

## Error Handling

The application includes comprehensive error handling for:

- Failed to load contacts on initial page load
- Failed to create a new contact
- Failed to update an existing contact
- Failed to delete a contact
- Contact not found scenarios

All errors are displayed as user-friendly notifications that automatically dismiss after 5 seconds.

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Run ESLint
- `pnpm run server` - Start JSON Server backend
