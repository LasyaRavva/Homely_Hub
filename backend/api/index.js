// Serverless entrypoint for Vercel
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const path = require('path');
const url = require('url');

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
    // Skip DB connect for health checks, root pings, and preflight
    const pathname = url.parse(req.url).pathname || '/';
    const skipDb =
      req.method === 'OPTIONS' ||
      pathname === '/' ||
      pathname === '/api' ||
      pathname === '/api/' ||
      pathname === '/api/health';

    if (!skipDb) {
      await ensureDb();
    }
    const handler = serverless(app);
    return handler(req, res);
  } catch (err) {
    console.error('Serverless handler error:', err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
};
