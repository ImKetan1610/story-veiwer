Here's a refined `README.md` for your GitHub project:

# Story Viewer Platform

A full-featured web application where users can view, like, save, and share stories across various categories, including food, health and fitness, travel, movies, and education. Users can create an account, log in, and contribute their own stories. The app is responsive and easy to navigate, ensuring a seamless experience for both logged-in and anonymous users.

## Live Demo

- **Frontend**: [Story Viewer on Vercel](https://story-veiwer.vercel.app/)
- **Backend**: [Story Viewer API on Render](https://story-veiwer.onrender.com)

## Features

### Frontend
- **User Authentication**: Sign up, log in, and manage user profiles.
- **Story Browsing**: Browse stories by category or view all available stories.
- **Story Management**: Create, edit, save, and share stories.
- **Responsive Design**: The platform is fully responsive, offering a smooth experience on mobile and desktop devices.
- **Redux Integration**: State management across the app using React-Redux and Redux Toolkit.
- **Notifications**: Toast notifications for success and error messages using `react-toastify`.

### Backend
- **User Authentication**: Implements JWT-based authentication for secure user sessions.
- **Story API**: Endpoints for creating, editing, retrieving, and deleting stories.
- **Data Persistence**: Stores user and story data using MongoDB.
- **CORS Support**: Ensures the frontend can communicate with the backend securely.
- **Error Handling**: Handles various errors gracefully, providing meaningful messages to the client.
- **Password Encryption**: Utilizes `bcrypt` to hash passwords securely.
  
## Project Structure

### Client (Frontend)
- **React**: The app is built using React and modern hooks.
- **Routing**: Handles multiple routes such as login, story viewing, and user profile management with `react-router-dom`.
- **State Management**: `Redux` is used for efficient state management across the app.
- **Styling**: Built with `Tailwind CSS` for fast and customizable UI development.
- **Build Tool**: Uses Vite for lightning-fast builds and a smooth development experience.

### Server (Backend)
- **Express**: Provides the core API for the application.
- **MongoDB**: Stores user accounts, stories, and other data.
- **JWT Authentication**: Secures API endpoints with JSON Web Tokens.
- **Environment Variables**: Manages configuration securely using `dotenv`.
- **Password Hashing**: Ensures that user passwords are stored securely with `bcrypt`.
- **Nodemon**: Simplifies the development process by automatically restarting the server on changes.

## How to Run Locally

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local instance or MongoDB Atlas)
- Vite for frontend development

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ImKetan1610/story-veiwer.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd story-veiwer
   ```

3. **Install dependencies for both frontend and backend:**
   ```bash
   # Install frontend dependencies
   cd Client
   npm install

   # Install backend dependencies
   cd ../Server
   npm install
   ```

4. **Set up environment variables:**
   - Create a `.env` file in the `Server` folder with the following details:
     ```plaintext
     MONGO_URI=your_mongo_db_connection_string
     JWT_SECRET=your_jwt_secret
     ```
   
5. **Start the backend server:**
   ```bash
   cd Server
   npm run dev
   ```

6. **Start the frontend server:**
   ```bash
   cd ../Client
   npm run dev
   ```

7. **Open your browser:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000](http://localhost:5000)
