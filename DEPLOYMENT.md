# Deployment Guide

## 1. Database (MongoDB Atlas)
1. Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new Cluster (Free Tier).
3. In "Database Access", create a user with a password.
4. In "Network Access", allow access from anywhere (`0.0.0.0/0`).
5. Get the connection string (SRV) and save it. It looks like: `mongodb+srv://<user>:<password>@cluster0.mongodb.net/ai-code-explainer`.

## 2. Backend (Render)
1. Create an account on [Render](https://render.com).
2. Create a new **Web Service**.
3. Connect your GitHub repository.
4. Settings:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. **Environment Variables**:
   - `MONGO_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: A strong secret key.
   - `OPENAI_API_KEY`: Your OpenAI API key.
   - `NODE_ENV`: `production`
   - `PORT`: `10000` (or whatever Render assigns, usually handled automatically but good to set).

## 3. Frontend (Vercel)
1. Create an account on [Vercel](https://vercel.com).
2. Create a new **Project** and import your Git repo.
3. Settings:
   - **Root Directory**: `client`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Environment Variables**:
   - Create a `.env.production` file in your `client` root or set env vars in Vercel UI.
   - `VITE_API_URL`: The URL of your deployed Backend (e.g., `https://your-app-backend.onrender.com/api`).
   - Note: You will need to update `client/src/utils/api.js` to use `import.meta.env.VITE_API_URL` instead of hardcoded localhost.

## 4. Updates for Production
- **CORS**: Update `server/src/app.js` to allow CORS only from your frontend domain.
  ```javascript
  app.use(cors({
    origin: 'https://your-frontend.vercel.app'
  }));
  ```
- **API URL**: In `client/src/utils/api.js`:
  ```javascript
  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const api = axios.create({ baseURL });
  ```
