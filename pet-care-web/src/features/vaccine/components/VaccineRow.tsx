import React from "react";
import { FaTrashAlt, FaRegEdit, FaEye } from "react-icons/fa";
import { Colors } from "../../../constants/Colors";
import type { Vaccine } from "../types/Vaccine";
import { deleteVaccine } from "../services/vaccineService";

const VaccineRow: React.FC<{ vaccine: Vaccine,  onDeleted: () => void }> = ({ vaccine, onDeleted }) => {
  const roleStyle = {
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: 600,
    background:
      vaccine.target_species === "Dog"
        ? Colors.bg_tag_orange
        : vaccine.target_species === "Cat"
          ? Colors.bg_tag_green
          : Colors.bg_tag_blue,
    color:
      vaccine.target_species === "Dog"
        ? Colors.text_tag_orange
        : vaccine.target_species === "Cat"
          ? Colors.text_tag_green
          : Colors.text_tag_blue,
  };

  const statusStyle = {
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "14px",
  };
  const styles: { [key: string]: React.CSSProperties } = {
    row: {
      background: Colors.white,
      boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
      borderRadius: "10px",
      transition: "0.2s",
    },
    cell: {
      padding: 16,
    },
    petImage: {
      width: "60px",
      height: "60px",
      objectFit: "cover",
      borderRadius: "50%",
    },
    role: roleStyle,
    status: statusStyle,
    actionBtn: {
      border: "none",
      background: Colors.background,
      padding: "8px",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "0.2s",
    },
  };
  const handleDelete = async () => {
    try {
      if (window.confirm("Bạn có chắc muốn xóa vaccine này?")) {
        const res = await deleteVaccine(vaccine.id!);
        if (res && (res.status === 200 || res.status === 201)) {
          alert("Xóa thành công!");
          onDeleted();
        } else {
          alert("Cập nhật thất bại, bạn hãy kiểm tra lại nhé!");
        }
      }
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
      alert("Xóa thất bại, bạn hãy thử lại nhé!");
      return;
    }
  };

  return (
    <tr style={styles.row}>
      <td style={styles.cell}>#{vaccine.id}</td>
      <td style={styles.cell}>
        <strong>{vaccine.name}</strong>
      </td>
      <td style={styles.cell}>{vaccine.quantity}</td>
      <td style={styles.cell}>
        <span style={styles.role}>{vaccine.target_species}</span>
      </td>
      <td style={styles.cell}>{vaccine.max_doses}</td>
      <td style={styles.cell}>
        <button
          style={{ ...styles.actionBtn, color: Colors.error }}
          onClick={handleDelete}
        >
          <FaTrashAlt />
        </button>
      </td>
      <td style={styles.cell}>
        <button
          style={{ ...styles.actionBtn, color: Colors.info }}
          onClick={() => navigation.navigate(`/edit-vaccine/${vaccine.id}`)}
        >
          <FaRegEdit />
        </button>
      </td>
      <td style={styles.cell}>
        <button
          style={{ ...styles.actionBtn, color: Colors.primary }}
          onClick={() => navigation.navigate(`/detail-vaccine/${vaccine.id}`)}
        >
          <FaEye />
        </button>
      </td>
    </tr>
  );
};

export default VaccineRow;
