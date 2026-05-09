import api from "./axiosInstance"
export const getProfile = async () => {
  const res = await api.get(`/users/profile`); 
  return res.data;
};
export const getAllUser = async () => {
  const res = await api.get("/users/all-users"); 
  return res.data;
};