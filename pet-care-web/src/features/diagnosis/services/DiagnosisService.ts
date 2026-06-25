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
export const markCompleteVaccine = async (id: number) => {
    return await api.patch(`/vaccine-pet/${id}/complete`);
}
export const cancelVaccine = async (id: number) => {
    return await api.patch(`/vaccine-pet/${id}/cancel`);
}
export const getAppointmentByVetId = async (vetId: number) => {
    const res = await api.get(`/appointment/vet/${vetId}`);
    return res.data;
}

export const createMedicalRecord = async (data: {
    pet_id: number;
    appointment_id?: number;
    symptoms: string;
    diagnosis: string;
    weight_at_exam?: number | null;
    vet_notes?: string;
    medications: Array<{
        medication_name: string;
        dosage: string;
        duration: number | "";
    }>;
    title: string;
}) => {
    return await api.post('/medical-record/create-medical-record', data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}
export const markCompleteAppointment = async (id: number) => {
    return await api.patch(`/appointment/${id}/complete`);
}
export const suggestNextSchedule = async(petId: string, vaccineId: string) => {
    return await api.get('/vaccine-pet/suggest-next/' + petId + '/' + vaccineId);
}