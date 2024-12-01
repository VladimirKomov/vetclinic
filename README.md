# Veterinary Clinic Web Application

This project is a web application designed for veterinary clinics to manage animals and their related events (visits, treatments, observations). It also provides functionality to export animal events to an Excel file for reporting purposes.

## Features

### Main Features
- **Animals Management:**
  - View a list of animals with their name, species, and age.
  - Add new animals (name, species, and birth date).
- **Animal Details:**
  - View details of a specific animal and its related events.
  - Add events (visit, treatment, observation) for an animal.
  - Export events of an animal to an Excel file.

### Technologies Used
- **Frontend:**
  - React with Vite for fast development. (The project originally required Vue.js, 
  which I'm still learning, but I'll adapt quickly and learn if necessary)
  - Redux Toolkit for state management.
  - Axios for API requests.
  - CSS Modules for styling.
- **Backend:**
  - Node.js with Express for building the REST API.
  - PostgreSQL database (hosted on Neon).
  - Knex.js for database migrations and queries.
- **Miscellaneous:**
  - `xlsx` library for Excel file creation.

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (>=16.x)
- PostgreSQL database

### Setup

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PGHOST=<your-database-host>
   PGDATABASE=<your-database-name>
   PGUSER=<your-database-username>
   PGPASSWORD=<your-database-password>
   PGPORT=<your-database-port>
   ```

   Run database migrations:
   ```bash
   npx knex migrate:latest
   ```

   Start the backend server:
   ```bash
   npm start
   ```
   The backend server will run on `http://localhost:5000`.

3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   ```

   Start the frontend server:
   ```bash
   npm run dev
   ```
   The frontend server will run on `http://localhost:5173`.

## API Endpoints

### Animals
- **GET /animals:** Get a list of all animals.
- **POST /animals:** Add a new animal.
- **GET /animals/:id:** Get details of a specific animal, including its events.
- **POST /animals/:id/events:** Add a new event for an animal.
- **GET /animals/:id/export:** Export events of an animal to an Excel file.

## Project Structure

### Backend
- **`/backend/src`**
  - `controllers`: Contains the business logic for API endpoints.
  - `routes`: Defines API routes.
  - `db`: Knex.js configuration and migrations.

### Frontend
- **`/frontend/src`**
  - `components`: Reusable UI components like `AnimalCard`, `AddAnimalModal`, `AnimalEvents`.
  - `pages`: Main pages like `Home` and `AnimalDetails`.
  - `redux`: Redux slices and store configuration.
  - `api`: API request logic.

## Usage

1. **View Animals:**
  - Navigate to the homepage to see a list of all animals.
2. **Add an Animal:**
  - Click the "Add Animal" button to open a modal for adding a new animal.
3. **View Animal Details:**
  - Click on an animal in the list to view its details and associated events.
4. **Add an Event:**
  - On the animal details page, click "Add Event" to open a modal for adding an event.
5. **Export Events:**
  - On the animal details page, click "Export Events" to download a report in Excel format.

## Known Issues
- Ensure the backend server is running before starting the frontend.
- If the database connection fails, check `.env` configuration in the backend.



