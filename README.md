# Task Management Application

## Links

- **Frontend**: [https://crework-assignment914.vercel.app](https://crework-assignment914.vercel.app)
- **Backend**: [https://crework-assignment-08pn.onrender.com](https://crework-assignment-08pn.onrender.com)

## Project Overview

This project is a task managenment assignment by Crework for fullstack developer position. I have tried my best to have a clean code with precise comments as welll as adhereing to best coding practices also following proper file structure Model View Controlller for backend and at Frontend making components as resulabel and code as modular as possible. I learned a lot through this project as well thank you.

## Features

1. **User Authentication**
   - Implemented secure signup and login functionality using email and password.
   - Passwords are securely stored, and user sessions are managed using cookie-based authentication.

2. **Task Board**
   - Upon logging in, users are presented with their personal task board.
   - The board consists of four columns: "To-Do", "In Progress", "Under Review", and "Completed".

3. **Task Management**
   - Users can create new tasks in any column.
   - Each task includes:
     - Title (mandatory)
     - Description (optional)
     - Status (automatically filled based on the column)
     - Priority (optional; values: Low, Medium, Urgent)
     - Deadline (optional)
   - Users can edit and delete tasks after creation.

4. **Drag and Drop Functionality**
   - Users can drag and drop tasks between columns to update their status.
   - The task's status is automatically updated in the database upon moving the task to a different column.

5. **Data Persistence**
   - All user data, including account information and tasks, is securely stored in a MongoDB database.
   - Each user can only view and manage their own tasks, with proper route protection in place.
   - Redux Toolkit is used to manage data consistency throughout the UI

## Technologies Used

- **Frontend**: Next.js, TypeScript, Redux Toolkit, Zod for form validation, CSS for styling.
- **Backend**: Node.js, Express, MongoDB.
- **Authentication**: Cookie-based authentication to manage user sessions and protect routes.

## UI and UX

- The UI is pixel-perfect, providing a clean and user-friendly experience.
- The drag-and-drop feature is seamlessly integrated, ensuring intuitive task management.

## Setup Instructions

### Frontend

1. **Install dependencies**:
   ```
   cd frontend
   npm install
   ```
   
2. **Start the development server**:
    ```
    npm run dev
    ```
3. **Environment Variables**:
    Create a `.env.local` file in the root of the frontend project and add the following:
    ```
    NEXT_PUBLIC_API_URL=http://localhost:3000/api
    NEXT_PROXY_API_URL=http://localhost:5000/api
    ```
### Backend

1. **Install dependencies**:
   ```
   cd backend
   npm install
   ```
2. **Start the server**:
   ```
   npm run dev
   ```
3. **Environment Variables**:
Create a `.env` file in the root of the backend project and add the following:
    ```
    ACCESS_TOKEN_SECRET=eb7d66634dc0399b8d3d09660856ee95e81209a934a789761762706b27b5c195
    ACCESS_TOKEN_EXPIRY=1d
    REFRESH_TOKEN_SECRET=fd367c9a8ea73a2031e083a33e696f24b75ef4c30b93226b2b2a129874ae3aea
    REFRESH_TOKEN_EXPIRY=10d
    MONGO_URI=mongodb://localhost:27017/crework
    CORS_ORIGIN=http://localhost:3000
    ENV = dev
    ```

## Note

Please ensure that the environment variables are correctly set up and that both the frontend and backend servers are running for the application to function properly.

For any issues or questions, please contact the development team.

