# server-test (MERN starter)

This workspace contains a simple MERN starter with two folders:

- `frontend` - Vite + React app (MVVM structure)
- `backend` - Node + Express + Mongoose API

Quick start (PowerShell):

1. Backend

   - Copy `.env.example` to `.env` inside `backend` and ensure `MONGO_URI` is set.
   - Install and start:

```
cd backend; npm install; npm run dev
```

2. Frontend

   - By default the frontend will call `http://localhost:4000`. To change it, set `VITE_API_BASE` in the environment.

```
cd frontend; npm install; npm run dev
```

Now open http://localhost:3000 and use the form to create a user. The backend runs on port 4000 by default.
