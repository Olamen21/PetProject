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
export const getAppointmentsByUserId = async (userId: string) => {
  const res = await api.get(`/appointment/user/` + userId);
  return res.data;
}
export const getProfile = async () => {
  const res = await api.get(`/users/profile`); 
  return res.data;
};
export const getAllPetUser = async () => {
  const res = await api.get(`/pets/pets`);
  return res.data;
};
export const getAppointmentByVetId = async (vetId: string) => {
  const res = await api.get(`/appointment/vet/` + vetId);
  return res.data;
}
export const getPrescriptionDisplayItem = async (petId: string) => {
  const res = await api.get('/medical-record/pet/' + petId + '/current-medications');
  return res.data;
}