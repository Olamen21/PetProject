import React from "react";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import { Colors } from "../../../constants/Colors";
import type { Pet } from "../types/Pet";

const PetRow: React.FC<{ pet: Pet }> = ({ pet }) => {
  const roleStyle = {
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: 600,
    background:
        pet.species === "Dog"
          ? Colors.bg_tag_orange
          : pet.species === "Cat"
            ? Colors.bg_tag_green
              : Colors.bg_tag_blue,
      color:
        pet.species === "Dog"
          ? Colors.text_tag_orange
            : pet.species === "Cat"
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

  return (
    <tr style={styles.row}>
      <td style={styles.cell}>#{pet.id}</td>
      <td style={styles.cell}>
        <strong>{pet.owner_name}</strong>
      </td>
      <td style={styles.cell}>
        <strong>{pet.name}</strong>
      </td>
      <td style={styles.cell}>{pet.breed_name}</td>
      <td style={styles.cell}>{pet.gender}</td>
      <td style={styles.cell}>
      <span style={styles.role}>{pet.species}</span>
      </td>

      <td style={styles.cell}>
        <button style={{ ...styles.actionBtn, color: Colors.error }}>
          <FaTrashAlt />
        </button>
      </td>
      <td style={styles.cell}>
        <button 
          style={{ ...styles.actionBtn, color: Colors.info }}
          onClick={() => navigation.navigate(`/edit-pet/${pet.id}`)}
        >
          <FaRegEdit />
        </button>
      </td>
    </tr>
  );
};

export default PetRow;
