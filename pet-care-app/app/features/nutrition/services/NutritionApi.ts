import api from "@/api/axiosInstance";

export const getNutrition = async () => {
  const res = await api.get(`/nutrition/all-nutrition`); 
  return res.data;
};