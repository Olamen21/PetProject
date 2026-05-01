import { removeToken, saveToken } from "./AuthStorage";
import api from "./Api";

export const signUp = async (data: { email: string; full_name: string; password: string }) => {
  const res = await api.post(`/auth/register`, data);
  return res.data;
};

export const login = async (data: { email: string; password: string; full_name: string }) => {
  const res = await api.post(`/auth/login`, data);

   if (res.data?.token) {
    await saveToken(res.data.token);
  }

  return res.data;
};
 

export const logout = async () => {
  await removeToken();
};