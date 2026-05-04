import React from "react";
import { FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import { Colors } from "../../../../constants/Colors";
import { approveVet } from "../../services/ManagementUser";
interface User {
  id: number;
  full_name: string;
  email: string;
  role: string;
  is_active: boolean;
}

interface Props {
  user: User;
}

const UserRow: React.FC<Props> = ({ user }) => {
  const roleStyle = {
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: 600,
    background:
      user.role === "ADMIN"
        ? Colors.bg_tag_orange
        : user.role === "VET"
          ? Colors.bg_tag_green
          : user.role === "PENDING_VET"
            ? Colors.bg_tag_warning
            : Colors.bg_tag_blue,
    color:
      user.role === "ADMIN"
        ? Colors.text_tag_orange
        : user.role === "PENDING_VET"
          ? Colors.text_tag_warning
          : user.role === "VET"
            ? Colors.text_tag_green
            : Colors.text_tag_blue,
  };

  const statusStyle = {
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "14px",
    background: user.is_active ? Colors.bg_verified : "#fdecea",
    color: user.is_active ? Colors.text_verified : Colors.error,
  };
  const styles: any = {
    row: {
      background: Colors.white,
      boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
      borderRadius: "10px",
      transition: "0.2s",
    },
    cell: {
      padding: 16,
    },
    role: roleStyle,
    status: statusStyle,
    actionBtn: {
      border: "none",
      background: Colors.background,
      padding: "8px",
      borderRadius: "8px",
      cursor: "pointer",
      marginRight: "6px",
      transition: "0.2s",
    },
  };

  const handleApprove = async (selectedUserId: string) => {
    try {
      await approveVet(selectedUserId);

      alert("Approval successful!");

      window.location.reload();
    } catch (error: any) {
      console.error("Lỗi approve:", error);
      alert(
        error.response?.data?.message || "An error occurred during approval",
      );
    }
  };

  return (
    <tr style={styles.row}>
      <td style={styles.cell}>#{user.id}</td>
      <td style={styles.cell}>
        <strong>{user.full_name}</strong>
      </td>
      <td style={styles.cell}>{user.email}</td>

      <td style={styles.cell}>
        <span style={styles.role}>{user.role}</span>
      </td>

      <td style={styles.cell}>
        {user.role === "PENDING_VET" && (
          <button
            style={{ ...styles.actionBtn, color: Colors.success }}
            onClick={() => handleApprove(user.id.toString())}
          >
            <FaCheckCircle />
          </button>
        )}
        <button style={{ ...styles.actionBtn, color: Colors.error }}>
          <FaTrashAlt />
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
