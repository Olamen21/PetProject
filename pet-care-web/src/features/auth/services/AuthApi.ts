import axios from "axios";

export interface SignUpPayload {
  email: string;
  password: string;
  full_name: string;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data?: T;
}

// Hàm đăng ký
export const signUp = async (payload: SignUpPayload): Promise<ApiResponse<any>> => {
    const API_URL = import.meta.env.VITE_API_URL
  try {
    const res = await axios.post(`${API_URL}/auth/register`, payload);
    return {
      status: res.status,
      message: "Đăng ký thành công",
      data: res.data,
    };
  } catch (error: any) {
    return {
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Có lỗi xảy ra",
    };
  }
};

// Hàm đăng nhập
export const login = async (payload: SignUpPayload): Promise<ApiResponse<any>> => {
    const API_URL = import.meta.env.VITE_API_URL
  try {
    const res = await axios.post(`${API_URL}/auth/login`, payload);
    return {
      status: res.status,
      message: "Đăng nhập thành công",
      data: res.data,
    };
  } catch (error: any) {
    return {
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Có lỗi xảy ra",
    };
  }
};
