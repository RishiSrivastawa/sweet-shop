# Sweet Shop Frontend 🍰

## Tech Stack

- React (Vite)
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Router DOM
- Axios
- Context API (Auth)
- JWT-based Authentication

---

## Features

- User Registration & Login
- JWT-based authentication handling
- Protected routes for authenticated users
- Role-based UI (Admin / User)
- View all available sweets
- Search & filter sweets
- Purchase sweets (quantity-aware)
- Admin dashboard:
  - Add sweets
  - Update sweets
  - Delete sweets
  - Restock sweets
- Responsive & modern UI using Tailwind + shadcn/ui
- Global loading states & toast notifications

---

## Pages

- `/` – Landing Page
- `/login` – User Login
- `/register` – User Registration
- `/dashboard` – Sweets Listing & Purchase
- `/admin` – Admin Controls (Protected)
- `*` – Not Found Page

---

## Project Structure

```txt
src/
 ├── api/            # Axios instance & API helpers
 ├── components/     # Reusable UI & layout components
 ├── context/        # Auth Context
 ├── hooks/          # Custom hooks
 ├── pages/          # Application pages
 ├── lib/            # Utility functions
 ├── App.tsx
 ├── main.tsx

My AI Usage 🤖
I used AI tools (ChatGPT) to:
  Debug Vite, Tailwind, and CSS issues
  Improve UI layout and responsiveness
  Refactor components for readability and reuse
All generated code was reviewed, customized, and integrated manually to ensure correctness and understanding.