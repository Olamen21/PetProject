import CommonTextInput from "../../../shared/components/CommonTextInput";
import { FiUser } from "react-icons/fi";
import { Colors } from "../../../constants/Colors";

function EditProfileBasicInfo({ form, handleChange, setForm }) {
  return (
    <div style={styles.sectionCard}>
      <div style={styles.sectionTitle}>Basic Info</div>

      <div style={styles.row}>
        <img src={form.avatar} style={styles.avatar} />

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
        </div>
      </div>

      <input
        type="file"
        onChange={(e: any) => {
          const file = e.target.files[0];
          if (file) {
            const url = URL.createObjectURL(file);
            setForm({ ...form, avatar: url });
          }
        }}
        style={{ marginTop: 10 }}
      />
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

  avatar: {
    width: 90,
    height: 90,
    borderRadius: "50%",
    objectFit: "cover",
  },

  
};
