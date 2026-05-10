import axios from "axios";
import { getToken } from "../../auth/services/AuthStorage";
import { Pet } from "../types/Pet";
import api from "../../../../api/axiosInstance";

const API_PET_SERVICE = process.env.EXPO_PUBLIC_API_URL_PET_SERVICE; 

const petApi = axios.create({
  baseURL: API_PET_SERVICE, 
});

petApi.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getPetList = async (): Promise<Pet[]> => {
  try {
    const res = await petApi.get(`/pets/pets`);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi gọi API pets:", error);
    throw error;
  }
};

export const getPetById = async (petId: string): Promise<Pet> => {
  try {
    const res = await petApi.get(`/pets/${petId}`);
    return res.data;
  } catch (error: any) {
    console.error("Lỗi khi gọi API pet:", error);
    throw error;
  }
};

export const createPet = async (data: Omit<Pet, "id" >): Promise<Pet> => {
  try {
    const res = await petApi.post(`/pets/create-pet`, data);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      console.error("API error:", error.response.status, error.response.data);
    } else {
      console.error("Network error:", error.message);
    }
    throw error;
  }
};


export const updatePetProfile = async (
  petId: number,
  data: Partial<Pet> 
): Promise<Pet> => {
  try {
    const res = await petApi.patch(`/pets/${petId}`, data);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      console.error("API error:", error.response.status, error.response.data);
    } else {
      console.error("Network error:", error.message);
    }
    throw error;
  }
};
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

export default petApi;