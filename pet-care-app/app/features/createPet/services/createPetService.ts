import api from "../../../../api/axiosInstance";

export const createPet = async (payload: any) => {
  return await api.post('/pets/create-pet', payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};