import axios from "axios";
import { getToken, removeToken } from "../app/features/auth/services/AuthStorage"; 
import { router } from "expo-router";

const API_URL = process.env.EXPO_PUBLIC_API_URL_GATEWAY; 

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await removeToken();
      router.replace("/LoginScreen"); 
    }
    return Promise.reject(error);
  }
);

export default api;