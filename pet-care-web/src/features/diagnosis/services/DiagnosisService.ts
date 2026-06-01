import api from "../../../api/axiosInstance";

export const getAllPetVaccine = async () => {
    const res = await api.get("/vaccine-pet/all-vaccine");
    return res.data;
}
export const getAllVaccine = async () => {
    const res = await api.get("/vaccine-category");
    return res.data;
}
export const getAllPet = async () => {
    const res = await api.get('/pets/all-pets');
    return res.data;
}
export const markComplete = async (id: number) => {
    return await api.patch(`/vaccine-pet/${id}/complete`);
}
export const cancelVaccine = async (id: number) => {
    return await api.patch(`/vaccine-pet/${id}/cancel`);
}
