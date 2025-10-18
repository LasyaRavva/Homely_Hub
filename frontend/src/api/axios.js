import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "",
  withCredentials: true,
});

export default api;
