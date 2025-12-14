# 🍬 Sweet Shop Management System

A full-stack Sweet Shop Management System built using **Test-Driven Development (TDD)**.  
The application allows users to browse and purchase sweets, while admins can manage inventory securely.

This project demonstrates **clean backend architecture**, **JWT authentication**, **role-based access control**, **React frontend**, and **modern UI with Tailwind + shadcn/ui**, all backed by a real database.

---

## 🚀 Features

### 👤 Authentication
- User registration & login
- JWT-based authentication
- Protected API routes
- Role-based access (User / Admin)

### 🍭 Sweet Management
- View all available sweets
- Search sweets by category
- Purchase sweets (quantity decreases)
- Prevent purchase when out of stock

### 🔐 Admin-Only Actions
- Add new sweets
- Update sweet details
- Delete sweets
- Restock sweets

### 🧪 Testing
- Backend built using **strict TDD**
- Red → Green → Refactor commits
- High test coverage with Jest + Supertest

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Jest + Supertest (TDD)

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Axios

---

## 📁 Project Structure
```text
sweet-shop/
│
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── middleware/
│ │ └── app.js
│ ├── tests/
│ ├── .env
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── api/
│ │ └── main.tsx
│ ├── tailwind.config.js
│ └── package.json
│
└── README.md
```


---

## 🔗 API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Sweets (Protected)
- `GET /api/sweets`
- `GET /api/sweets?category=`
- `POST /api/sweets` (Admin)
- `PUT /api/sweets/:id` (Admin)
- `DELETE /api/sweets/:id` (Admin)

### Inventory (Protected)
- `POST /api/sweets/:id/purchase`
- `POST /api/sweets/:id/restock` (Admin)

---

## ⚙️ Running Locally

### 1️⃣ Backend Setup

```bash
cd backend
npm install
```
Create a .env file:
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```
Run tests:
```bash
npm test
```
Start backend:
```bash
npm start
```
Backend runs on:
```bash
http://localhost:5000
```

### 2️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on:
```bash
http://localhost:8080
```
🧪 Testing Report

All backend features implemented using Test-Driven Development

Jest test suites cover:
    
    Authentication
    
    Authorization
    
    Sweet CRUD
    
    Purchase & Restock logic
    
    Admin-only access

All tests pass successfully.

### 🖼 Screenshots

### 🤖 My AI Usage

I used ChatGPT responsibly throughout the project as a development assistant.

How AI was used:

    Designing Jest test cases following TDD
    
    Debugging MongoDB, Jest, and async issues
    
    Refactoring controller logic
    
    Understanding Express middleware flows
    
    Clarifying frontend integration with backend APIs

What I did manually:

    Core business logic
    
    Database schema design
    
    Authentication & authorization flow
    
    Project structure decisions
    
    Debugging test failures
    
    UI integration and fixes
