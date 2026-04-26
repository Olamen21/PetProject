import React from "react";
import { FiUser } from "react-icons/fi";
import { Colors } from "../../../../constants/Colors";
import CommonTextInput from "../../../../shared/components/CommonTextInput";

function EditProfileBasicInfo({ form, handleChange, setForm, handleFileChange }) {
  return (
    <div style={styles.sectionCard}>
      <div style={styles.sectionTitle}>Basic Info</div>

      <div style={styles.row}>
        {form?.avatar ? (
          <img
            src={form?.avatar}
            alt="Avatar Preview"
            style={styles.avatarImage}
          />
        ) : (
          <div style={styles.avatarFallback}>
            {form?.full_name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}

        <div style={{ flex: 1 }}>
          <CommonTextInput
            Icon={FiUser}
            placeholder="Doctor Name"
            value={form.name}
            onChangeText={(e) => handleChange("name", e.target.value)}
          />

          <CommonTextInput
            placeholder="Role"
            value={form.role}
            onChangeText={(e) => handleChange("role", e.target.value)}
            containerStyle={{ marginTop: 10 }}
          />

          <CommonTextInput
            placeholder="Bio"
            value={form.bio}
            onChangeText={(e) => handleChange("bio", e.target.value)}
            containerStyle={{ marginTop: 10 }}
          />
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <label style={styles.uploadLabel}>
            Change Avatar
          <input
            type="file"
            accept="image/*"
            onChange={(e: any) => {
              const file = e.target.files[0];
              if (file) {
                handleFileChange(file);
              }
            }}
            style={{ display: "none" }}
          />
        </label>
      </div>
    </div>
  );
}

export default EditProfileBasicInfo;

const styles: { [key: string]: React.CSSProperties } = {
  sectionCard: {
    background: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    boxShadow: "0 4px 12px " + Colors.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 16,
  },
  row: {
    display: "flex",
    gap: 16,
    alignItems: "center",
  },
  avatarImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    border: "4px solid " + Colors.white,
    objectFit: "cover",
  },
  avatarFallback: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: Colors.secondary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "18px",
    color: Colors.white,
  },
  uploadLabel: {
    display: "inline-block",
    padding: "8px 16px",
    background: Colors.primary_light,
    color: Colors.text,
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
    border: "2px solid " + Colors.border,
  },
};
