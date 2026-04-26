import React from "react";
import {
  FiUser,
  FiMail,
  FiCalendar,
  FiPhone,
  FiHome,
  FiMapPin,
  FiCreditCard,
  FiClock,
} from "react-icons/fi";
import { Colors } from "../../../../constants/Colors";

interface ProfileDetailProps {
  fullName: string;
  email: string;
  dob: string;
  phone: string;
  clinicRoom: string;
  address: string;
  degree: string;
  experienceStart: string;
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({
  fullName,
  email,
  dob,
  phone,
  clinicRoom,
  address,
  degree,
  experienceStart,
}) => {
  const fields = [
    { icon: <FiUser />, label: "Full Name", value: fullName },
    { icon: <FiMail />, label: "Email", value: email, badge: "Email Verified" },
    { icon: <FiCalendar />, label: "Date of Birth", value: dob },
    { icon: <FiPhone />, label: "Phone", value: phone, badge: "Number Verified" },
    { icon: <FiHome />, label: "Clinic Room", value: clinicRoom },
    { icon: <FiMapPin />, label: "Address", value: address },
    { icon: <FiCreditCard />, label: "Degree", value: degree },
    { icon: <FiClock />, label: "Experience Start Date", value: experienceStart },
  ];

  return (
    <div style={styles.cardDetail}>
      <div style={styles.header}>
        <div style={styles.title}>Doctor Profile</div>
      </div>

      <div style={styles.grid}>
        {fields.map((field, index) => (
          <div key={index} style={styles.item}>
            <div style={styles.icon}>{field.icon}</div>
            <div>
              <div style={styles.label}>{field.label}</div>
              <div style={styles.value}>
                {field.value}
                {field.badge && <span style={styles.badge}>{field.badge}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileDetail;

const styles: { [key: string]: React.CSSProperties } = {
  cardDetail: {
    background: Colors.background,
    borderRadius: "12px",
    padding: "20px",
    margin: "20px 24px 24px 24px",
    border: "1px solid " + Colors.border,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "18px",
    fontWeight: 600,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },
  item: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
  },
  icon: {
    fontSize: "18px",
    color: Colors.text,
    marginTop: "3px",
  },
  label: {
    fontSize: "12px",
    color: Colors.text,
    marginBottom: "4px",
  },
  value: {
    fontSize: "14px",
    fontWeight: 500,
    color: Colors.text,
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  badge: {
    fontSize: "11px",
    background: Colors.bg_verified,
    color: Colors.text_verified,
    padding: "2px 8px",
    borderRadius: "999px",
  },
};
