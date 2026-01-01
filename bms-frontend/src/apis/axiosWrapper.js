import axios from "axios";

<<<<<<< HEAD
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:9000/api/v1",
=======
/**
 * Central Axios instance for the entire app
 * Uses backend URL from environment variable
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
>>>>>>> bccff77cb28450856a139870ad32e65e3d0ec1a6
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

<<<<<<< HEAD
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // SAME KEY
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

=======
>>>>>>> bccff77cb28450856a139870ad32e65e3d0ec1a6
export default api;
