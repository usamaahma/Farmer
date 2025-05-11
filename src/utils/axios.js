import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000/v1"; // <-- change this to your local API base if needed

// Create instances with consistent base URLs
const users = axios.create({
  baseURL: `${baseURL}/auth`,
});

// Request Interceptor
const requestInterceptor = (req) => {
  // Optional: Add auth tokens if needed
  // req.headers.Authorization = `Bearer ${localStorage.getItem("token") || ""}`;
  return req;
};

const errorInterceptor = (err) => {
  console.error("Request failed:", err);
  return Promise.reject(err);
};

// Apply interceptors
[users].forEach((instance) => {
  instance.interceptors.request.use(requestInterceptor, errorInterceptor);
});

export { users };
