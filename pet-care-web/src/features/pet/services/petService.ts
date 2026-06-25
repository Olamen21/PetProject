import api from "../../../api/axiosInstance"

export const getPet = async () => {
  const res = await api.get('/pets/all-pets');
  return res.data;
}

export const getPetById = async (id: string) => {
  const res = await api.get('/pets/' + id);
  return res.data;
}

export const getAllBreed = async () => {
  const res = await api.get('/breeds/all-breeds');
  return res.data;
}

export const updatePet = async (payload: FormData, id: string) => {
  return await api.patch("pets/" + id, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const createPet = async (payload: FormData) => {
  return await api.post('/pets/create-pet', payload,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}