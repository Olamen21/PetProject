import type React from "react";
import { FaUserCircle } from "react-icons/fa";
import {
  MdOutlineEmail,
  MdOutlineBadge,
  MdPhoneIphone,
  MdLocationOn,
} from "react-icons/md";
import { FiCalendar } from "react-icons/fi";
import { GrUserAdmin } from "react-icons/gr";
import type { User } from "../../../../shared/types/User";
import { Colors } from "../../../../constants/Colors";

type UserBasicInfoProps = {
  user: User;
};

function UserBasicInfo({ user }: UserBasicInfoProps) {

  // Hàm định dạng ngày sinh sang dd/mm/yyyy 
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("vi-VN");
    } catch {
      return dateStr;
    }
  };

  return (
    <div style={styles.sectionCard}>
      <div style={styles.sectionTitle}>User Basic Info</div>
      
      {/* Avatar Section */}
      <div style={styles.row}>
        <div style={styles.avatarWrapper}>
          {user.avatar_url ? (
            <img
              src={user.avatar_url}
              alt="User Avatar"
              style={styles.avatarImage}
            />
          ) : (
            <FaUserCircle size={50} color={Colors.border} />
          )}
        </div>
      </div>

      {/* Row 1: Full Name & Role */}
      <div style={styles.row}>
        <div style={styles.infoField}>
          <MdOutlineBadge size={20} style={styles.fieldIcon} />
          <div style={styles.textContainer}>
            <span style={styles.label}>Full Name</span>
            <span style={styles.value}>{user.full_name || "N/A"}</span>
          </div>
        </div>

        <div style={styles.infoField}>
          <GrUserAdmin size={18} style={styles.fieldIcon} />
          <div style={styles.textContainer}>
            <span style={styles.label}>Role</span>
            <span style={styles.value}>{user.role || "N/A"}</span>
          </div>
        </div>
      </div>

      {/* Row 2: Email & Phone */}
      <div style={styles.row}>
        <div style={styles.infoField}>
          <MdOutlineEmail size={20} style={styles.fieldIcon} />
          <div style={styles.textContainer}>
            <span style={styles.label}>Email Address</span>
            <span style={styles.value}>{user.email || "N/A"}</span>
          </div>
        </div>

        <div style={styles.infoField}>
          <MdPhoneIphone size={20} style={styles.fieldIcon} />
          <div style={styles.textContainer}>
            <span style={styles.label}>Phone Number</span>
            <span style={styles.value}>{user.phone || "N/A"}</span>
          </div>
        </div>
      </div>

      {/* Row 3: Date of Birth & Rating (Nếu có) */}
      <div style={styles.row}>
        <div style={styles.infoField}>
          <FiCalendar size={18} style={styles.fieldIcon} />
          <div style={styles.textContainer}>
            <span style={styles.label}>Date of Birth</span>
            <span style={styles.value}>{formatDate(user.date_of_birth)}</span>
          </div>
        </div>

        <div style={styles.infoField}>
          <MdLocationOn size={20} style={styles.fieldIcon} />
          <div style={styles.textContainer}>
            <span style={styles.label}>Address</span>
            <span style={styles.value}>{user.address || "N/A"}</span>
          </div>
        </div>
      </div>
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
  avatarWrapper: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    overflow: "hidden",
    backgroundColor: Colors.sidebar,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  // Style mới bổ sung để giả lập các ô Input dạng Read-only đồng bộ thiết kế ô Input cũ
  infoField: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    background: "#f8f9fa", // Bạn có thể đổi sang mã màu nền nhẹ phù hợp thiết kế của bạn
    border: `1px solid ${Colors.border}`,
    borderRadius: 8,
    padding: "10px 14px",
    height: "50px", 
    boxSizing: "border-box",
  },
  fieldIcon: {
    marginRight: 12,
    color: "#6c757d", // Màu icon nhẹ nhàng ở trạng thái tĩnh
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
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
};

export default UserBasicInfo;