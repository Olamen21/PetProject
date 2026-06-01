import api from "../../../api/axiosInstance";

export const getAppointmentByVetId = async (vetId: number) => {
    const res = await api.get(`/appointment/vet/${vetId}`);
    return res.data;
}
export const getAllPet = async () => {
    const res = await api.get('/pets/all-pets');
    return res.data;
}