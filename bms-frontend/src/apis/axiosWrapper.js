import axios from "axios";

/**
 * Central Axios instance for the entire app
 * Uses backend URL from environment variable
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
