import api from "../../../api/axiosInstance";

export const updateProfile = async (payload: FormData) => {
  return await api.patch("/users/profile", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const changePassword = async (oldPassword: string, newPassword: string) => {
  return await api.patch("/users/change-password", {
    oldPassword,
    newPassword,
  });
};
export const calculateVetRating = async (id: string) => {
  const res = await api.get('/review/calculate-vet-rating/'+ id);
  return res.data;
}
export const countCompletedAppointments = async (id: string) => {
  const res = await api.get('/appointment/count-appointment/' + id);
  return res.data;

}