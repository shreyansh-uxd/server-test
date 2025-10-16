# Server Test - Full Stack Application

A full-stack application with React frontend and Express/MongoDB backend.

## Project Structure

```
server-test/
├── backend/          # Express.js backend
├── frontend/         # React frontend
├── package.json      # Root package.json for shared commands
├── render.yaml       # Render deployment configuration
└── Dockerfile        # Docker configuration
```

## Development Setup

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation
```bash
# Install all dependencies (root, backend, and frontend)
npm run install:all

# Or install individually
npm install              # Root dependencies
npm run install:backend  # Backend dependencies
npm run install:frontend # Frontend dependencies
```

### Running the Application

```bash
# Run both frontend and backend concurrently
npm run dev

# Or run individually
npm run dev:backend   # Backend only (port 4000)
npm run dev:frontend  # Frontend only (port 5173)
```

## Production Deployment

### Using Render

1. Connect your GitHub repository to Render
2. Use the `render.yaml` configuration file
3. The build process will:
   - Install all dependencies
   - Build the React frontend
   - Serve frontend from the Express backend

### Manual Deployment

```bash
# Build the frontend
npm run build

# Start the production server
npm start
```

### Using Docker

```bash
# Build the Docker image
docker build -t server-test .

# Run the container
docker run -p 4000:4000 server-test
```

## Environment Variables

Make sure to set these environment variables in your deployment platform:

- `NODE_ENV=production`
- `PORT` (will be set automatically by most platforms)
- MongoDB connection string (currently hardcoded in backend/index.js)

## API Endpoints

- `GET /api/users` - Fetch all users
- `POST /api/users` - Create a new user

## Features

- User creation with name and email
- User listing with refresh functionality
- Error handling and loading states
- Responsive design
- Production-ready build configuration
