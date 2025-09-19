#Lucid Task
A simple full-stack task management app to create, track, and manage tasks.

## Features

- Create, update, and delete tasks
- Track completed vs pending tasks
- Set priority and due dates for tasks
- Responsive UI with separate frontend and backend
- Dashboard with task completion charts
- User profile management

---

## How to Use

1. Open the app in your browser.
2. Create a new task by entering a title, description, due date, and priority.
3. Mark tasks as completed when done.
4. View task statistics on the dashboard (completed vs pending).

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Recharts
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **State Management:** Zustand
- **Authentication & User Management:** JWT, Context API

---

## Installation

1. Clone the repo:  
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

#Install backend dependencies:

cd backend
npm install

#Install frontend dependencies:

cd frontend
npm install

#Setup environment variables in .env (backend):

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=8000

#Running the Project

Backend:
cd backend
npm run dev

Frontend:
cd frontend
npm start


Open http://localhost:5173 to view the app.
