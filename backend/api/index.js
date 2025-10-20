// Serverless entrypoint for Vercel
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const path = require('path');

// Load env
require('dotenv').config({ path: path.join(__dirname, '..', 'config.env') });

const app = require('../app');

const DB = process.env.DATABASE || process.env.DATABASE_LOCAL;

let connPromise = null;
async function ensureDb() {
  // 1 = connected, 2 = connecting
  if (mongoose.connection.readyState === 1) return;
  if (!connPromise) {
    connPromise = mongoose.connect(DB).then(() => {
      console.log('DB connection Succesfull');
    });
  }
  await connPromise;
}

module.exports = async (req, res) => {
  try {
    await ensureDb();
    const handler = serverless(app);
    return handler(req, res);
  } catch (err) {
    console.error('Serverless handler error:', err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
};
