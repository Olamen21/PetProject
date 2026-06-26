import type React from "react";
import { 
  MdWorkspacePremium, 
  MdOutlineMedicalServices, 
  MdOutlineHistoryEdu,
  MdOutlineDescription
} from "react-icons/md";
import { FiCalendar, FiExternalLink } from "react-icons/fi";
import type { DoctorProfile } from "../../../../shared/types/User";
import { Colors } from "../../../../constants/Colors";

type UserDoctorInfoProps = {
  doctorProfile?: DoctorProfile;
};

function UserDoctorInfo({ doctorProfile }: UserDoctorInfoProps) {
  // Nếu không có thông tin profile bác sĩ (ví dụ tài khoản là ADMIN), không cần hiển thị card này
  if (!doctorProfile) return null;

  return (
    <div style={styles.sectionCard}>
      <div style={styles.sectionTitle}>Doctor Professional Info</div>

      {/* Row 1: Degree & Clinic Room */}
      <div style={styles.row}>
        <div style={styles.infoField}>
          <MdWorkspacePremium size={20} style={styles.fieldIcon} />
          <div style={styles.textContainer}>
            <span style={styles.label}>Degree</span>
            <span style={styles.value}>{doctorProfile.degree || "N/A"}</span>
          </div>
        </div>

        <div style={styles.infoField}>
          <MdOutlineMedicalServices size={20} style={styles.fieldIcon} />
          <div style={styles.textContainer}>
            <span style={styles.label}>Clinic Room</span>
            <span style={styles.value}>{doctorProfile.clinic_room || "N/A"}</span>
          </div>
        </div>
      </div>

      {/* Row 2: Years of Experience & Experience Start Date */}
      <div style={styles.row}>
        <div style={styles.infoField}>
          <MdOutlineHistoryEdu size={20} style={styles.fieldIcon} />
          <div style={styles.textContainer}>
            <span style={styles.label}>Years of Experience</span>
            <span style={styles.value}>
              {doctorProfile.years_of_experience ? `${doctorProfile.years_of_experience} Years` : "N/A"}
            </span>
          </div>
        </div>

        <div style={styles.infoField}>
          <FiCalendar size={18} style={styles.fieldIcon} />
          <div style={styles.textContainer}>
            <span style={styles.label}>Experience Start Date</span>
            <span style={styles.value}>{doctorProfile.experience_start_date || "N/A"}</span>
          </div>
        </div>
      </div>

      {/* Row 3: Biography (Chiếm trọn 1 dòng hoặc hiển thị dạng khối rộng) */}
      <div style={styles.row}>
        <div style={{ ...styles.infoField, height: "auto", minHeight: "60px", alignItems: "flex-start" }}>
          <MdOutlineDescription size={20} style={{ ...styles.fieldIcon, marginTop: 4 }} />
          <div style={styles.textContainer}>
            <span style={styles.label}>Biography / Bio</span>
            <span style={{ ...styles.value, whiteSpace: "pre-line", marginTop: 4 }}>
              {doctorProfile.bio || "No biography provided."}
            </span>
          </div>
        </div>
      </div>

      {/* Row 4: Certificate */}
      {doctorProfile.certificate_url && (
        <div style={styles.row}>
          <div style={styles.infoField}>
            <FiExternalLink size={18} style={styles.fieldIcon} />
            <div style={styles.textContainer}>
              <span style={styles.label}>Professional Certificate</span>
              <a 
                href={doctorProfile.certificate_url} 
                target="_blank" 
                rel="noreferrer" 
                style={styles.linkValue}
              >
                Click to view certificate
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    gap: 10,
  },
  infoField: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    background: "#f8f9fa",
    border: `1px solid ${Colors.border}`,
    borderRadius: 8,
    padding: "10px 14px",
    height: "50px", 
    boxSizing: "border-box",
  },
  fieldIcon: {
    marginRight: 12,
    color: "#6c757d",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: "#868e96",
    textTransform: "uppercase",
    fontWeight: 500,
  },
  value: {
    fontSize: 14,
    color: "#212529",
    fontWeight: 500,
    marginTop: 2,
  },
  linkValue: {
    fontSize: 14,
    color: "#007bff",
    fontWeight: 500,
    marginTop: 2,
    textDecoration: "none",
  }
};

export default UserDoctorInfo;