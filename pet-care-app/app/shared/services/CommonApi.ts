import api from "../../../api/axiosInstance";

export const getPetList = async() => {
  const res = await api.get('/pets/pets');
  return res.data;
}