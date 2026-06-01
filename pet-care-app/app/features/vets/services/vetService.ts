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
  return await api.post('/vaccine-pet/create-vaccine', payload, {
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
  const res = await api.get(`/vaccine-pet/pet/` + petId);
  return res.data;
}

export const getAllVets = async () => {
  const res = await api.get('/users/all-vets');
  return res.data;
}
export const getVetById = async (id: string) => {
  const res = await api.get('/users/vet/' + id);
  return res.data;
}
export const bookAppointment = async (payload: any) => {
  return await api.post('/appointment/create-appointment', payload, {
    headers: {
      'Content-Type': 'application/json', 
    },
  });
}