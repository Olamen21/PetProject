import React from "react";
import { FaUserShield, FaSearch, FaPlus } from "react-icons/fa";
import { Colors } from "../../../constants/Colors";
import CommonButton from "../../../shared/components/CommonButton";

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const PetHeader: React.FC<Props> = ({ searchTerm, setSearchTerm }) => {

const styles: any = {
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    },
    left: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontSize: 28,
        fontWeight: 600,
        color: Colors.text
    },
    right: {
      display: "flex",
      alignItems: "center",
      gap: 10,
    },
    searchBox: {
        display: "flex",
        alignItems: "center",
        background: Colors.white,
        border: `1px solid ${Colors.border}`,
        borderRadius: 10,
        padding: "8px 14px",
        width: 280
    },
};
  return (
    <div style={styles.content}>
      
      <div style={styles.left}>
        <FaUserShield color={Colors.primary} />
        Pet List Management
      </div>

      <div style={styles.right}>
        <div style={styles.searchBox}>
          <FaSearch color={Colors.gray} />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            style={{ border: "none", outline: "none", width: "100%" }}
          />
        </div>
        <CommonButton
          title="New pet"
          onClick={() => navigation.navigate("/new-pet")}
          Icon={FaPlus}
          backgroundColor= {Colors.primary}
          textColor= {Colors.white}
        />
      </div>
    </div>
  );
};

export default PetHeader;
       