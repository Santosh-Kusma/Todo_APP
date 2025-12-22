📝 Todo Application (MERN Stack)

A full-stack Todo Application built with React, Redux Toolkit, Node.js, Express, and MongoDB, featuring secure authentication, protected routes, and clean state management.

This project demonstrates real-world frontend architecture, proper error handling, and scalable code structure.

----

🚀 Features

✅ Authentication

# User Registration
# User Login
# JWT-based authentication
# password hash
# Secure token handling via Axios interceptor
# Logout functionality
# Protected routes using auth state

✅ Todo Management

# Create new tasks
# Edit task title & description inline
# Toggle task status (pending / completed)
# Delete tasks
# Real-time UI updates via Redux

✅ UX & Architecture

# Global state management with Redux Toolkit
# Async operations using createAsyncThunk
# Client-side validation + backend validation
# Centralized API error handling
# Protected routing with React Router
# Modular folder structure
# Clean and readable code

---

🛠️ Tech Stack

## Frontend
React (Vite)
Redux Toolkit
React Router DOM
Axios
CSS Modules

## Backend
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication

---

🔐 Authentication Flow

# User registers via /register
# After successful registration → redirected to /login
# User logs in → JWT token stored securely
# Axios interceptor attaches token to all API requests
# Protected routes are accessible only when authenticated
# On logout or token expiry → user is redirected to login

---

🔁 State Management Strategy

# Auth State
# Managed globally using Redux
# isAuthenticated controls routing & UI behavior
# Tasks State
# CRUD handled via async thunks
# Loading states managed per action (fetch, add, update, delete)
# Error Handling
# API errors handled globally
# Form validation handled locally for better UX

---

⚙️ Environment Variables

# Frontend (.env)
VITE_SERVER_URL -- server base url(backend)

# Backend (.env)
PORT            -- server port
DB_URL          -- db config with dbname
ALLOW_ORIGIN    -- frontend app url
SECRET_KEY      -- for JWT token

---

▶️ Running the Project
# Frontend
npm install
npm run dev

# Backend
npm install
node server.js

---

## video link for the reference
https://drive.google.com/file/d/15nEKS8bQzxnNbupp4-STMCwDTi4OssL-/view?usp=drive_link

---

👤 Author

Santosh Kusma
MERN Stack Developer
Focused on clean architecture, scalability, and real-world patterns.







