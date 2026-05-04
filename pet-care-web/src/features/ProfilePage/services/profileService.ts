import api from "../../../api/axiosInstance";

export const updateProfile = async (payload: any) => {
  return await api.patch("/users/profile", payload);
};
export const changePassword = async (oldPassword: string, newPassword: string) => {
  return await api.patch("/users/change-password", {
    oldPassword,
    newPassword,
  });
};