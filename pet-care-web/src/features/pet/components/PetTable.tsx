import React from "react";
import PetRow from "./PetRow";
import { Colors } from "../../../constants/Colors"; 
import type { Pet } from "../types/Pet";

const PetTable: React.FC<{ pets: Pet[] }> = ({ pets }) => {
    const styles: any = {
        table: {
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: "0 10px"
        },  
        headerCell: {
            fontSize: 18, 
            color: Colors.text_secondary,
            textAlign: "left",
            paddingBottom: 12
        }
    };
  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.headerCell}>ID</th>
          <th style={styles.headerCell}>Owner</th>
          <th style={styles.headerCell}>Name</th>
          <th style={styles.headerCell}>Breed</th>
          <th style={styles.headerCell}>Gender</th>
          <th style={styles.headerCell}>Species</th>
        </tr>
      </thead>

      <tbody>
        {pets.map((pet) => (
          <PetRow key={pet.id} pet={pet} />
        ))}
      </tbody>
    </table>
  );
};

export default PetTable;