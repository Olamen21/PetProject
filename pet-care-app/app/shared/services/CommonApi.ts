import api from "@/api/axios";
import petApi from "@/app/features/home/services/PetApi";
import { Pet } from "@/app/shared/types/Pet";

export const getPetList = async (): Promise<Pet[]> => {
  try {
    const res = await petApi.get(`/pets/pets`);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi gọi API pets:", error);
    throw error;
  }
};
// export const getPetList = async (): Promise<Pet[]> => {
//   const res = await api.get('/pets/pets');
//   return res.data;
// };
