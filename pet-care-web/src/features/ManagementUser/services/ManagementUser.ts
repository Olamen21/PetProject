import api from "../../../api/axiosInstance";

export const getAllUser = async () => {
  const res = await api.get("/users/all-users"); 
  return res.data;
};

export const approveVet = async (userId: string) => {
  const res = await api.patch(`/users/${userId}/assign-role`, { 
    role: "VET" 
  });
  return res.data;
};