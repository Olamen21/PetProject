import React from "react";
import { FaUserMd } from "react-icons/fa";
import { Colors } from "../../../../constants/Colors";

const UploadHeader: React.FC = () => {
  return (
    <div style={styles.header}>
      <FaUserMd size={50} color={Colors.primary} />
      <h2 style={styles.h2}>Complete Your Profile</h2>
      <p style={styles.p}>Please provide your professional information for approval.</p>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  header: { textAlign: "center", marginBottom: "30px" },
  h2: { marginTop: "10px", color: Colors.text },
  p: { color: Colors.gray },
};

export default UploadHeader;
