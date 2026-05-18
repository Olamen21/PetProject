import api from "../../../../api/axiosInstance";

export const getPetById = async (id: string) => {
    const res = await api.get('/pets/' + id);
    return res.data;
}
export const getAllBreed = async () => {
  const res = await api.get('/breeds');
  return res.data;
}
export const createVaccine = async (payload: any) => {
  return await api.post('/vaccine/create-vaccine', payload, {
    headers: {
      'Content-Type': 'application/json', 
    },
  });
};
export const getAllVaccineCategory = async() => {
  const res = await api.get('/vaccine-category');
  return res.data;
}
export const getVaccineByPetId = async (petId: string) => {
  const res = await api.get(`/vaccine/pet/` + petId);
  return res.data;
}