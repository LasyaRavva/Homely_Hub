// Local development server bootstrap
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

// Load env vars
dotenv.config({ path: path.join(__dirname, 'config.env') });

// Prefer local DB for dev, or fallback to DATABASE if provided
const DB = process.env.DATABASE_LOCAL || process.env.DATABASE;
const PORT = process.env.PORT || 8000;

console.log(DB);

mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection Succesfull');
    app.listen(PORT, () => {
      console.log('App Running on port:', PORT);
    });
  })
  .catch((err) => {
    console.error('Mongo connection error:', err);
    process.exit(1);
  });