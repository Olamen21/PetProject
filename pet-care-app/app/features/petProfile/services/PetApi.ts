import api from "../../../../api/axiosInstance";

export const getPetById = async (petId: string) => {
  const res =  await api.get('/pets/' + petId);
  return res.data;
}



export const updatePet = async (id: number, payload: FormData) => {
  return await api.patch("pets/" + id, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};



export const getAllBreed = async () => {
  const res = await api.get('/breeds');
  return res.data;
}

export const getProfile = async () => {
  const res = await api.get(`/users/profile`); 
  return res.data;
};
