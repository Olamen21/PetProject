import api from "../../../api/axiosInstance";

export const getAppointmentByVetId = async (vetId: number) => {
    const res = await api.get(`/appointment/vet/${vetId}`);
    return res.data;
}
export const getAllPet = async () => {
    const res = await api.get('/pets/all-pets');
    return res.data;
}
export const markCompleteAppointment = async (id: number) => {
    return await api.patch(`/appointment/${id}/confirm`);
}
export const cancelAppointment = async (id: number) => {
    return await api.patch(`/appointment/${id}/cancel`);
}