
import React from "react";
import { FaPen } from "react-icons/fa";
import { Colors } from "../../../constants/Colors";
import CommonButton from "../../../shared/components/CommonButton";
interface ProfileHeaderProps {
  name: string;
  role: string;
  imageUrl: string;
  onEdit: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  role,
  imageUrl,
  onEdit,
}) => {
  return (
    <div style={styles.content}>
      <div style={styles.left}>
        <img src={imageUrl} alt="avatar" style={styles.avatar} />

        <div>
          <div style={styles.nameRow}>
            <div style={styles.name}>{name}</div>
          </div>

          <div style={styles.subRow}>
            <span>{role}</span>
          </div>
        </div>
      </div>

      <CommonButton
        title="Edit Profile"
        onClick={onEdit}
        Icon={FaPen}
        iconSize={14}
        backgroundColor={Colors.primary}
        textColor={Colors.white}
        style={{
          width: "150px",
          padding: "8px 12px",
        }}
        textStyle={{ fontSize: 14 }}
      />
    </div>
  );
};

export default ProfileHeader;

const styles: { [key: string]: React.CSSProperties } = {
  content: {
    padding: "20px 24px",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  left: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    border: "4px solid " + Colors.white,
    marginTop: "-60px",
    objectFit: "cover",
  },
  name: {
    fontSize: "24px",
    fontWeight: 700,
    color: Colors.text,
  },
  nameRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "6px",
  },
  subRow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: Colors.text,
    fontSize: "14px",
    marginTop: "4px",
  },
};
