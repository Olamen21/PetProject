import api from "@/api/axios";
import petApi from "../../home/services/PetApi";
import { Pet } from "@/app/shared/types/Pet";

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

// export const createPet = async (payload: any) => {
//   return await api.post('/pets/create-pet', payload, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// };