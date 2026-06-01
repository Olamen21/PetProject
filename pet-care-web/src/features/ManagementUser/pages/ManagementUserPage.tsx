import React, { useEffect, useState } from "react";
import Sidebar from "../../../shared/components/Sidebar";
import { Colors } from "../../../constants/Colors";
import UserHeader from "../components/ManagementUserPage/UserHeader";
import UserTable from "../components/ManagementUserPage/UserTable";
import { getProfile } from "../../../api/UserApi";
import {getAllUser } from "../../../api/UserApi";

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
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);

        const userData = await getProfile();
        setUser(userData);

        if (userData.role !== "ADMIN") {
          setError("Bạn không có quyền truy cập trang này.");
          return; 
        }

        const allUsers = await getAllUser();
        setUsers(allUsers);
        setError(null);
      } catch (err: any) {
        console.error("Lỗi hệ thống:", err);
        setError(err.response?.data?.message || "Không thể tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

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

      <div style={{ flex: 1, padding: 30 }}>
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
