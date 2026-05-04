import api from "../../../api/axiosInstance";

export interface SignUpPayload {
  email: string;
  password: string;
  full_name: string;
}

export const signUp = async (data: SignUpPayload) => {
  const res = await api.post("/auth/register", data);
   if (res.data?.access_token) {
    localStorage.setItem("token", res.data.access_token);
  }
  return res.data;
};

export const login = async (data: Omit<SignUpPayload, 'full_name'> | SignUpPayload) => {
  const res = await api.post("/auth/login", data);
  
  if (res.data?.access_token) {
    localStorage.setItem("token", res.data.access_token);
  }

  return res.data;
};

export const applyVet = async (formDataPayload: FormData) => {
  const res = await api.post("/users/apply-vet", formDataPayload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};


export const logout = async () => {
  try {
    localStorage.removeItem("token");
    
    window.location.href = "/login";
  } catch (error) {
    console.error("Lỗi khi logout:", error);
  }
};