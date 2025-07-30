# Deployment Guide for Render

## Prerequisites
1. MongoDB Atlas account (for database)
2. Render account

## Environment Variables Setup

### Backend Environment Variables (set in Render dashboard):
- `MONGO_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT signing
- `NODE_ENV`: Set to "production"
- `PORT`: Render will set this automatically

### Frontend Environment Variables (set in Render dashboard):
- `REACT_APP_API_URL`: Your backend service URL (e.g., https://your-backend-service.onrender.com)

## Deployment Steps

### Option 1: Using render.yaml (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repository to Render
3. Render will automatically detect the `render.yaml` file and deploy both services

### Option 2: Manual Deployment

#### Backend Deployment:
1. Create a new Web Service in Render
2. Connect your GitHub repository
3. Set the following:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Environment**: Node
4. Add environment variables as listed above

#### Frontend Deployment:
1. Create a new Static Site in Render
2. Connect your GitHub repository
3. Set the following:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/build`
4. Add environment variables as listed above

## Important Notes

1. **CORS**: The backend is configured to handle CORS for production
2. **Static Files**: The backend serves the React build files in production
3. **API URLs**: Update the `REACT_APP_API_URL` in render.yaml with your actual backend URL after deployment
4. **Database**: Make sure your MongoDB Atlas cluster allows connections from Render's IP addresses

## Local Development
- Run `npm run install-all` to install all dependencies
- Run `npm start` to start both frontend and backend in development mode 