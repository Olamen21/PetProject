import petApi from "@/app/features/petProfile/services/PetApi";
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