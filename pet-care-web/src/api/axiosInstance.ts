import axios from "axios";

const API_URL = import.meta.env.VITE_API_GATEWAY_URL;

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      console.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
      navigation.navigate("/login")
    }
    return Promise.reject(error);
  },
);

export default api;
