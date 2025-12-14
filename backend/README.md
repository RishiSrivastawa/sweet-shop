# Sweet Shop Backend 🍬

## Tech Stack
- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication
- Jest + Supertest (TDD)

## Features
- User authentication (JWT)
- Role-based access (Admin / User)
- Sweet inventory management
- Purchase & restock flow
- Fully test-driven backend

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Sweets (Protected)
- GET /api/sweets
- GET /api/sweets?category=
- POST /api/sweets (Admin)
- PUT /api/sweets/:id (Admin)
- POST /api/sweets/:id/purchase
- POST /api/sweets/:id/restock (Admin)
- DELETE /api/sweets/:id (Admin)

## Running Locally
```bash
npm install
npm test
npm start


My AI Usage 🤖

I used ChatGPT to:

Design test cases following TDD
Debug Jest & MongoDB issues
Refactor controller logic
