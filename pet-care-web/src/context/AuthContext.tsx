import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login")
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: {exp: number} = jwtDecode(token);
        if(Date.now() >= decoded.exp *1000) {
          logout();
        } else {
           const API_URL_USER = import.meta.env.VITE_API_URL_USER; 
            axios.get(`${API_URL_USER}/users/profile`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then(res => setUser(res.data))
            .catch(() => logout());
        }
      } catch {
        logout();
      }
    }
  }, []);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401) {
          logout();
        }
        return Promise.reject(err);
      }
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, [])


  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context || {}; 
}