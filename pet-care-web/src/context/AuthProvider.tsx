import React, { useState, useEffect } from "react";
import { getProfile } from "../api/UserApi";
import type { User } from "../shared/types/User";
import { AuthContext } from "./AuthContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const data = await getProfile();
          setUser(data);
        } catch (error) {
          console.error("Không thể khôi phục phiên đăng nhập", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user_role");
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_role");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
