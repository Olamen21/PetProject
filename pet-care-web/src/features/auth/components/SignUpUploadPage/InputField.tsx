import React from "react";
import { Colors } from "../../../../constants/Colors";

interface InputFieldProps {
  label: string;
  icon: React.ReactNode;
  type: string;
  name: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, icon, type, name, placeholder, onChange, required }) => {
  return (
    <div style={styles.inputGroup}>
      <label style={styles.label}>{label}</label>
      <div style={{ position: "relative" }}>
        <span style={styles.icon}>{icon}</span>
        <input
          style={styles.input}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
        />
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  inputGroup: { marginBottom: "20px" },
  label: { display: "block", marginBottom: "8px", fontWeight: "bold", color: Colors.text },
  icon: { position: "absolute", left: "15px", top: "12px", color: Colors.primary },
  input: {
    width: "100%",
    padding: "12px 12px 12px 45px",
    borderRadius: "10px",
    border: "1px solid" + Colors.gray,
    fontSize: "16px",
    boxSizing: "border-box",
  },
};

export default InputField;
