
import React from "react";
import {
  FiUser,
  FiMail,
  FiCalendar,
  FiPhone,
  FiHome,
  FiMapPin,
  FiCreditCard,
} from "react-icons/fi";
import { Colors } from "../../../constants/Colors";

const ProfileDetail: React.FC = () => {
  return (
    <div style={styles.cardDetail}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.title}>Doctor Profile</div>
      </div>

      {/* Grid */}
      <div style={styles.grid}>
        {/* Full Name */}
        <div style={styles.item}>
          <FiUser style={styles.icon} />
          <div>
            <div style={styles.label}>Full Name</div>
            <div style={styles.value}>Dr. Tran Thi Huong</div>
          </div>
        </div>

        {/* Email */}
        <div style={styles.item}>
          <FiMail style={styles.icon} />
          <div>
            <div style={styles.label}>Email</div>
            <div style={styles.value}>
              tranhuong@petcare.vn
              <span style={styles.badge}>Email Verified</span>
            </div>
          </div>
        </div>

        {/* Date of Birth */}
        <div style={styles.item}>
          <FiCalendar style={styles.icon} />
          <div>
            <div style={styles.label}>Date of Birth</div>
            <div style={styles.value}>12/10/1985</div>
          </div>
        </div>

        {/* Phone Number */}
        <div style={styles.item}>
          <FiPhone style={styles.icon} />
          <div>
            <div style={styles.label}>Phone</div>
            <div style={styles.value}>
              0909 876 543
              <span style={styles.badge}>Number Verified</span>
            </div>
          </div>
        </div>

        {/* Clinic Room */}
        <div style={styles.item}>
          <FiHome style={styles.icon} />
          <div>
            <div style={styles.label}>Clinic Room</div>
            <div style={styles.value}>Room 201 — Floor 2</div>
          </div>
        </div>

        {/* Address */}
        <div style={styles.item}>
          <FiMapPin style={styles.icon} />
          <div>
            <div style={styles.label}>Address</div>
            <div style={styles.value}>
              PetCare Veterinary Hospital, Da Nang
            </div>
          </div>
        </div>

        {/* City */}
        <div style={styles.item}>
          <FiHome style={styles.icon} />
          <div>
            <div style={styles.label}>City</div>
            <div style={styles.value}>Da Nang</div>
          </div>
        </div>

        {/* Degrees */}
        <div style={styles.item}>
          <FiCreditCard style={styles.icon} />
          <div>
            <div style={styles.label}>Degree</div>
            <div style={styles.value}>
              Doctor of Veterinary Medicine — Nong Lam University
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div style={styles.item}>
          <FiCreditCard style={styles.icon} />
          <div>
            <div style={styles.label}>Certifications</div>
            <div style={styles.value}>
              WSAVA · VNVMA · Ultrasound & Diagnostic Imaging
            </div>
          </div>
        </div>

        {/* License Number */}
        <div style={styles.item}>
          <FiCreditCard style={styles.icon} />
          <div>
            <div style={styles.label}>License Number</div>
            <div style={styles.value}>VN-VET-2016-0472</div>
          </div>
        </div>
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
