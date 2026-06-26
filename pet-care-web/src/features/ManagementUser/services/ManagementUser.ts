import api from "../../../api/axiosInstance";

export const approveVet = async (userId: string) => {
  const res = await api.patch(`/users/${userId}/assign-role`, { 
    role: "VET" 
  });
  return res.data;
};

export const getVetById = async (id: string) => {
  const res = await api.get('/users/pending-vet/' + id);
  return res.data;
}