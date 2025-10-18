# Deployment Guide for Homely Hub

## Frontend Deployment (Netlify)

### Option 1: Deploy via Netlify UI (Recommended)

1. **Push your code to GitHub** (✅ Already done!)

2. **Go to [Netlify](https://www.netlify.com/)** and sign up/login with your GitHub account

3. **Click "Add new site" → "Import an existing project"**

4. **Connect to GitHub** and select the `homely_hub` repository

5. **Configure build settings:**

   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/build`

6. **Click "Deploy site"**

7. **Set environment variables (if needed):**
   - Go to Site settings → Environment variables
   - Add any `REACT_APP_*` variables your frontend needs
   - Example: `REACT_APP_API_URL` = your backend URL (from Render)

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Navigate to your project root
cd c:\Users\Swapnika\Desktop\Homely-hub

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

---

## Backend Deployment (Render)

### Step-by-Step Instructions

1. **Go to [Render](https://render.com/)** and sign up/login with your GitHub account

2. **Click "New +" → "Web Service"**

3. **Connect to GitHub** and select the `homely_hub` repository

4. **Configure the service:**

   - Name: `homely-hub-backend`
   - Region: Choose closest to you
   - Branch: `main`
   - Root Directory: `backend`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `node server.js`

   **Note:** Your `package.json` has `"start": "nodemon server.js"` which is for development. Render will use `node server.js` instead (nodemon is not needed in production).

5. **Set environment variables:**
   Click "Advanced" → Add environment variables from your `backend/config.env`:

   - `NODE_ENV` = `production`
   - `PORT` = `8000` (Render will override this automatically)
   - `DATABASE_LOCAL` = Your MongoDB connection string (use MongoDB Atlas for production)
   - `JWT_SECRET` = Your JWT secret
   - `JWT_EXPIRES_IN` = `90d`
   - `JWT_COOKIE_EXPIRES_IN` = `90`
   - `EMAIL_HOST` = Your email host
   - `EMAIL_PORT` = `25`
   - `EMAIL_USERNAME` = Your email username
   - `EMAIL_PASSWORD` = Your email password
   - `STRIPE_SECRECT_KEY` = Your Stripe secret key
   - `STRIPE_PUBLISHABLE_KEY` = Your Stripe publishable key
   - `CLOUD_NAME` = Your Cloudinary name
   - `CLOUD_KEY` = Your Cloudinary key
   - `CLOUD_KEY_SECRET` = Your Cloudinary secret

6. **Choose the free plan** (or paid if needed)

7. **Click "Create Web Service"**

8. **Wait for deployment** (takes 2-5 minutes)

9. **Copy the deployed URL** (e.g., `https://homely-hub-backend.onrender.com`)

10. **Update your frontend to use this backend URL:**

    **Important:** Your frontend uses relative API URLs with a proxy in development. For production on Netlify:

    a. **Set environment variable in Netlify:**

    - Go to Site settings → Environment variables
    - Add: `REACT_APP_API_URL` = `https://your-backend-app.onrender.com` (your Render URL)
    - Click "Save"
    - Trigger a new deploy for the variable to take effect

    b. **Update your API calls** (optional, for better organization):

    - A helper file has been created at `frontend/src/api/axios.js`
    - You can gradually refactor your API calls to use this centralized instance
    - Example: `import api from '../api/axios'` then use `api.post('/api/v1/rent/user/login', user)`

---

## Database Setup (MongoDB Atlas)

Since you're using MongoDB, you'll need a cloud database for production:

1. **Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)** and create a free account

2. **Create a new cluster** (Free tier is fine for testing)

3. **Create a database user** with a strong password

4. **Whitelist IP addresses:**

   - Go to Network Access → Add IP Address
   - Add `0.0.0.0/0` (allow from anywhere) for Render to connect

5. **Get your connection string:**

   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `myFirstDatabase` with `HomelyHub`

6. **Add to Render environment variables:**
   - Update `DATABASE_LOCAL` in Render with your MongoDB Atlas connection string
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/HomelyHub?retryWrites=true&w=majority`

---

## CORS Setup

Make sure your backend allows requests from your Netlify frontend:

In your `backend/app.js`, ensure CORS is configured:

```javascript
const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://your-netlify-domain.netlify.app",
    ],
    credentials: true,
  })
);
```

Update `https://your-netlify-domain.netlify.app` with your actual Netlify URL after deployment.

---

## Post-Deployment Checklist

- [ ] Frontend deployed to Netlify successfully
- [ ] Backend deployed to Render successfully
- [ ] MongoDB Atlas database created and connected
- [ ] Environment variables set in both Netlify and Render
- [ ] CORS configured to allow Netlify domain
- [ ] Frontend API calls updated to use Render backend URL
- [ ] Test full application flow (signup, login, bookings, etc.)
- [ ] SSL certificates auto-generated (both Netlify and Render do this automatically)

---

## Troubleshooting

### Frontend Issues

- **Build fails:** Check Node version matches your local environment
- **API calls fail:** Verify CORS settings and backend URL in environment variables
- **Icons not showing:** Ensure Material Symbols font is loaded in `index.html`

### Backend Issues

- **Server crashes:** Check logs in Render dashboard
- **Database connection fails:** Verify MongoDB Atlas connection string and IP whitelist
- **Environment variables missing:** Double-check all vars are set in Render

---

## Alternative Backend Hosting Options

- **Railway:** Similar to Render, easy deployment
- **Heroku:** Classic platform (has free tier limitations)
- **AWS Elastic Beanstalk:** More complex but scalable
- **Google Cloud Run:** Serverless option
- **DigitalOcean App Platform:** Simple and affordable

Choose based on your budget and scaling needs.
