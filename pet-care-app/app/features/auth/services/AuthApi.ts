import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL_AUTH;

export const signUp = async (data: { email: string; full_name: string; password: string }) => {
  const res = await axios.post(`${API_URL}/auth/register`, data);
  return res.data;
};

export const login = async (data: { email: string; password: string; full_name: string }) => {
  const res = await axios.post(`${API_URL}/auth/login`, data);
  return res.data;
};
 