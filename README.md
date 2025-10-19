# Homely Hub

A full-stack property rental platform (Airbnb-style) built with React and Node.js/Express.

## 📁 Project Structure

```
Homely-hub/
├── frontend/          # React app (Create React App)
├── backend/           # Node.js/Express API
└── Database/          # Test data and schemas
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- MongoDB (local or Atlas)
- Git

### 1. Clone the repository

```bash
git clone https://github.com/LasyaRavva/Homely_hub.git
cd Homely-hub
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `backend/config.env` with your configuration:

```env
NODE_ENV=development
PORT=8000
DATABASE_LOCAL=mongodb://127.0.0.1:27017/HomelyHub

JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

EMAIL_HOST=your-smtp-host
EMAIL_PORT=25
EMAIL_USERNAME=your-username
EMAIL_PASSWORD=your-password

STRIPE_SECRECT_KEY=your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key

CLOUD_NAME=your-cloudinary-name
CLOUD_KEY=your-cloudinary-key
CLOUD_KEY_SECRET=your-cloudinary-secret
```

Start the backend:

```bash
npm start
# or: node server.js
```

Backend runs on `http://localhost:8000`

### 3. Frontend Setup

```bash
cd frontend
npm install --legacy-peer-deps
```

Start the frontend:

```bash
npm start
```

Frontend runs on `http://localhost:3000`

### 4. Build for Production

```bash
cd frontend
npm run build
```

Preview production build locally:

```bash
npm run preview
```

## 🌐 Deployment

### Frontend Deployment (Vercel)

1. **Import your repository** to Vercel
2. **Configure project settings:**

   - **Root Directory:** `frontend`
   - **Framework Preset:** Create React App
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
   - **Install Command:** `npm install --legacy-peer-deps`
   - **Node.js Version:** 20.x

3. **Add Environment Variables** (Settings → Environment Variables):

   ```
   NPM_FLAGS=--legacy-peer-deps
   REACT_APP_API_URL=https://your-backend-url.com
   REACT_APP_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
   ```

4. **Deploy** — Push to main branch or click "Deploy" in Vercel

### Backend Deployment (Vercel/Render/Railway)

For Vercel:

- **Root Directory:** `backend`
- **Build Command:** (leave empty for Node.js)
- **Output Directory:** (leave empty)
- **Install Command:** `npm install`

Add all environment variables from `config.env` to your hosting platform.

## 🛠️ Tech Stack

### Frontend

- React 18
- Redux Toolkit (state management)
- React Router (routing)
- Ant Design (UI components)
- Stripe (payments)
- Leaflet (maps)
- Axios (HTTP client)

### Backend

- Node.js / Express
- MongoDB / Mongoose
- JWT (authentication)
- Stripe (payment processing)
- Cloudinary (image uploads)
- Nodemailer (emails)

## 📝 Available Scripts

### Frontend (`cd frontend`)

- `npm start` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build locally
- `npm test` — Run tests

### Backend (`cd backend`)

- `npm start` — Start server
- `node server.js` — Alternative start command

## 🔒 Security Notes

- Never commit `backend/config.env` or `.env` files
- Rotate API keys if accidentally exposed
- Use environment variables for all secrets in production

## 🐛 Troubleshooting

### Frontend build fails with "react-scripts: command not found"

- Ensure you're in the `frontend` directory
- Run `npm install --legacy-peer-deps` to resolve peer dependency conflicts

### Backend can't connect to MongoDB

- Check `DATABASE_LOCAL` in `config.env`
- Ensure MongoDB is running: `mongod` or check Atlas connection string

### CORS errors in production

- Set backend CORS to allow your frontend domain
- Configure `REACT_APP_API_URL` to point to deployed backend

## 📄 License

This project is for educational purposes.

## 👥 Contributors

- [LasyaRavva](https://github.com/LasyaRavva)
