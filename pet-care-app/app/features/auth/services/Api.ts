import axios from "axios";
import { getToken } from "./AuthStorage";

const API_URL = process.env.EXPO_PUBLIC_API_URL_AUTH;

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

export default api;
