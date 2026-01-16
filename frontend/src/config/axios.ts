import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "/api";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor
 */
apiClient.interceptors.request.use(
  (config) => {
    // Attach auth token if needed
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor
 */
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error(
      "API Error:",
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

export default apiClient;
