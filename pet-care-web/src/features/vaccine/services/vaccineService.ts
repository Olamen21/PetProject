import api from "../../../api/axiosInstance"

export const getAllVaccine = async () => {
    const res = await api.get("/vaccine-category/all-vaccine-category");
    return res.data;
}

export const getVaccineById = async (id: string) => {
    const res = await api.get("/vaccine-category/" + id);
    return res.data;
}
export const createVaccine = async (payload: FormData) => {
    return await api.post('/vaccine-category/create-vaccine-category', payload, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}


export const updateVaccine = async (payload: FormData, id: string) => {
    return await api.patch('/vaccine-category/' + id, payload, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}
export const deleteVaccine = async (id: string) => {
    return await api.delete('/vaccine-category/' + id);
}