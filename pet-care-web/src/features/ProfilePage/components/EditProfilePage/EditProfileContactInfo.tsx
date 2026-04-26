import { FiMail, FiPhone, FiMapPin, FiCalendar, FiHome } from "react-icons/fi";import { Colors } from "../../../../constants/Colors";
import CommonTextInput from "../../../../shared/components/CommonTextInput";
function EditProfileContactInfo({ form, handleChange }) {
  return (
    <div style={styles.sectionCard}>
      <div style={styles.sectionTitle}>Contact Info</div>

      <div style={styles.grid}>

        <CommonTextInput
          Icon={FiPhone}
          placeholder="Phone"
          value={form.phone}
          onChangeText={(e) => handleChange("phone", e.target.value)}
        />

        <CommonTextInput
          placeholder="Date of Birth"
            Icon={FiCalendar}
          type="date"
          value={form.dob}
          onChangeText={(e) => handleChange("dob", e.target.value)}
        />

        <CommonTextInput
          Icon={FiHome}
          placeholder="Address"
          value={form.address}
          onChangeText={(e) => handleChange("address", e.target.value)}
        />

        <CommonTextInput
          placeholder="Clinic Room"
              Icon={FiMapPin}
          value={form.clinicRoom}
          onChangeText={(e) => handleChange("clinicRoom", e.target.value)}
        />
      </div>
    </div>
  );
}

export default EditProfileContactInfo;

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
  tagContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 10,
  },

  tag: {
    padding: "6px 12px",
    borderRadius: 999,
    background: Colors.secondary,
    fontSize: 13,
    display: "flex",
    alignItems: "center",
    gap: 6,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: 16,
  },
};
