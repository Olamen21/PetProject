import React from "react";
import { FaPen, FaLock } from "react-icons/fa";
import { Colors } from "../../../../constants/Colors";
import CommonButton from "../../../../shared/components/CommonButton";

interface ProfileHeaderProps {
  name: string;
  role: string;
  bio?: string;
  avatar: React.ReactNode;
  onEditProfile?: () => void; 
  onChangePassword?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  role,
  bio,
  avatar,
  onEditProfile,
  onChangePassword,
}) => {
  return (
    <div style={styles.content}>
      <div style={styles.left}>
        {avatar}

        <div>
          <div style={styles.nameRow}>
            <div style={styles.name}>{name}</div>
          </div>

          <div style={styles.subRow}>
            <span>{role}</span>
          </div>

          {bio && (
            <div style={styles.bioRow}>
              <span>{bio}</span>
            </div>
          )}
        </div>
      </div>
      <div style={styles.button}>
        <CommonButton
          title="Change Password"
          onClick={onChangePassword}
          Icon={FaLock}
          iconSize={14}
          backgroundColor={Colors.white} 
          borderColor={Colors.black} 
          textColor={Colors.red} 
          bordered={true} 
          style={{
            width: "200px",
            padding: "8px 12px",
          }}
           textStyle={{ fontSize: 14 }}
        />

        <CommonButton
          title="Edit Profile"
          onClick={onEditProfile}
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
  bioRow: {
    marginTop: "6px",
    color: Colors.text_secondary,
    fontSize: "13px",
    lineHeight: "1.4",
  },
  button: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
};
