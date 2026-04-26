import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../../shared/components/Sidebar";
import { Colors } from "../../../constants/Colors";
import UserHeader from "../components/ManagementUserPage/UserHeader";
import UserTable from "../components/ManagementUserPage/UserTable";
import { useAuth } from "../../../context/AuthContext";

interface User {
  id: number;
  full_name: string;
  email: string;
  role: string;
  is_active: boolean;
}

const ManagementUserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);
  const userFromAuth = useAuth();

useEffect(() => {
    if (!userFromAuth) return;

    if (userFromAuth.role !== "ADMIN") {
      setError("Bạn không có quyền truy cập trang này.");
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const API_URL_USER = import.meta.env.VITE_API_URL_USER;

        const res = await axios.get(`${API_URL_USER}/users/all-users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(res.data);
        setError(null);
      } catch (err: any) {
        console.error("Lỗi fetch users:", err);
        setError(err.response?.data?.message || "Không thể tải danh sách.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userFromAuth]); 

  const filteredUsers = users.filter(
    (u) =>
      u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div
      style={{
        display: "flex",
        background: Colors.background,
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div style={{ flex: 1, padding: 30, marginLeft: 260 }}>
        <div
          style={{
            background: Colors.white,
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 6px 16px rgba(0,0,0,0.05)",
          }}
        >
          <UserHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          {loading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              Đang tải dữ liệu...
            </div>
          ) : error ? (
            <div style={{ color: "red", textAlign: "center", padding: "20px" }}>
              {error}
            </div>
          ) : (
            <UserTable users={filteredUsers} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagementUserPage;
