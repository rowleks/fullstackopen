# Phonebook Application

A full-stack phonebook application built with React and Vite, featuring CRUD operations for managing contacts. The application uses a JSON Server backend for data persistence and includes real-time error handling with automatic notifications.

## Features

- **Create Contacts**: Add new contacts with name and phone number
- **Read Contacts**: View all saved contacts in a list
- **Update Contacts**: Update existing contact phone numbers (with confirmation prompt)
- **Delete Contacts**: Remove contacts from the phonebook (with confirmation prompt)
- **Search/Filter**: Search contacts by name in real-time
- **Error Handling**: Comprehensive error states with user-friendly notifications
- **Success Notifications**: Visual feedback for successful operations
- **Auto-dismiss Messages**: Notifications automatically disappear after 5 seconds
- **Duplicate Detection**: Prevents duplicate names and offers to update instead

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
