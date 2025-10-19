import axios from 'axios';

// Create axios instance with base URL from environment variable
// Falls back to local proxy for development
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
