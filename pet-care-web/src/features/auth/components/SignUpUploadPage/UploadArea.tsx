import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Colors } from "../../../../constants/Colors";

interface UploadAreaProps {
  imagePreview: string | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadArea: React.FC<UploadAreaProps> = ({
  imagePreview,
  handleFileChange,
}) => {
  return (
    <div
      style={styles.uploadArea}
      onClick={() => document.getElementById("fileInput")?.click()}
    >
      <FaCloudUploadAlt size={30} color={Colors.primary} />
      <p style={styles.p}>Select Image</p>
      <input
        id="fileInput"
        type="file"
        hidden
        accept="image/*"
        onChange={handleFileChange}
      />
      {imagePreview && (
        <img src={imagePreview} alt="Preview" style={styles.image} />
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  uploadArea: {
    border: `2px dashed ${Colors.primary}`,
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: Colors.background,
    marginBottom: "20px",
  },
  image: {
    marginTop: "10px",
    width: "100%",
    borderRadius: "8px",
    maxHeight: "200px",
    objectFit: "cover",
  },
  p: { margin: "5px 0", color: Colors.primary },
};

export default UploadArea;
