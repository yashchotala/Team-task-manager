# 📋 Team Task Manager - MERN Full-Stack Application

A production-ready web app for team project and task management.

## 🎯 Features
✅ User Authentication (Signup/Login with JWT)
✅ Role-Based Access Control (Admin/Member)
✅ Project Management (Create, Update, Delete Projects)
✅ Task Management (Create, Assign, Track Progress)
✅ Dashboard with Statistics
✅ Task Status Updates (Todo → In Progress → Done)
✅ Responsive UI with Tailwind CSS

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- MongoDB Atlas account
- Git

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT Secret
npm run dev
```

### Frontend Setup (new terminal)
```bash
cd frontend
npm install
npm run dev
```

### Access
Open http://localhost:3000

## 🔑 Test Credentials

**Admin Account:**
- Email: admin@test.com
- Password: password123

**Member Account:**
- Email: member@test.com
- Password: password123

## 📁 Project Structure

```
team-task-manager/
├── backend/           # Express + MongoDB backend
│   ├── config/        # DB configuration
│   ├── models/        # Mongoose schemas
│   ├── controllers/   # Business logic
│   ├── routes/        # API routes
│   ├── middleware/    # Auth & error handling
│   └── server.js      # Entry point
├── frontend/          # React + Vite frontend
│   ├── src/
│   │   ├── pages/     # Page components
│   │   ├── components/# Reusable components
│   │   ├── context/   # Auth context
│   │   ├── services/  # API services
│   │   └── App.jsx    # Main app
│   └── index.html
└── README.md
```

## 🔗 API Endpoints

### Auth
- POST /api/auth/signup
- POST /api/auth/login

### Projects
- POST /api/projects (Admin only)
- GET /api/projects
- PUT /api/projects/:id/add-member (Admin)
- DELETE /api/projects/:id (Admin)

### Tasks
- POST /api/tasks (Admin only)
- GET /api/tasks
- PUT /api/tasks/:id (Update status)
- DELETE /api/tasks/:id (Admin only)

## 🌐 Deployment

### Railway Deployment:

1. Push code to GitHub
2. Create new Railway project
3. Set environment variables:
   - MONGODB_URI
   - JWT_SECRET
4. Deploy

## 📝 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT
- **Database**: MongoDB Atlas

## 📚 Documentation

See SETUP_INSTRUCTIONS.md and POSTMAN_COLLECTION.md in the project files.

---
Created with ❤️ for Team Task Manager Project
