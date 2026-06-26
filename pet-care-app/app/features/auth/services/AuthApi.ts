import { router } from "expo-router";
import api from "../../../../api/axiosInstance";
import { removeToken, saveToken } from "./AuthStorage";

export const signUp = async (data: { email: string; full_name: string; password: string }) => {
  const res = await api.post(`/auth/register`, data);
   if (res.data?.access_token) {
    await saveToken(res.data.access_token);
  }
  return res.data;
};

export const login = async (data: { email: string; password: string; full_name: string }) => {
  const res = await api.post(`/auth/login`, data);
   if (res.data?.access_token) {
    await saveToken(res.data.access_token);
  }

  return res.data;
};
 

export const logout = async () => {
  try {
    await removeToken(); 
    router.replace("./LoginScreen"); 
  } catch (error) {
    console.error("Lỗi khi logout:", error);
  }
};