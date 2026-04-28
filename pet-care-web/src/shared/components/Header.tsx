import React, { useState } from "react";
import { FaBars, FaBell, FaCog, FaSearch } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import CommonButton from "./CommonButton";
import { Colors } from "../../constants/Colors";
import CommonTextInput from "./CommonTextInput";

interface UserProfile {
  name: string;
  role: string;
  avatarUrl: string;
}

interface HeaderProps {
  user: UserProfile;
  onToggleMenu: () => void;
  onSearch?: (query: string) => void;
  onOpenNotifications: () => void;
  onOpenSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({
  user,
  onToggleMenu,
  onSearch,
  onOpenNotifications,
  onOpenSettings,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <header
      style={styles.header}
    >
      {/* Left side */}
      <div style={styles.leftSide}>
        <CommonButton 
            Icon={FaBars}
            onClick={onToggleMenu}
            iconSize={20}
            style={{ padding: "10px 10px"}}
        />
        <CommonTextInput 
            placeholder="Search"
            value={searchQuery}
            onChangeText={handleSearchChange}
            type="text"
            rightIcon={<FaSearch size={20} color={Colors.text_secondary} />}
        />
      </div>

      {/* Right side */}
      <div style={styles.rightSide}>
        <CommonButton 
            Icon={IoNotificationsOutline}
            onClick={onOpenNotifications}
            iconSize={20}
            style={{ padding: "10px 10px"}}
        />
        <CommonButton 
            Icon={HiOutlineCog6Tooth}
            onClick={onOpenSettings}
            iconSize={20}
            style={{ padding: "10px 10px"}}
        />

        {/* User profile */}
        <div style={styles.userProfile}>
          <div style={styles.userDetails}>
            <span style={{ fontWeight: "bold" }}>{user.name}</span>
            <span style={{ fontSize: "0.8rem", color: "#666" }}>{user.role}</span>
          </div>
          <img
            src={user.avatarUrl}
            alt={user.name}
            style={styles.avatar}
          />
        </div>
      </div>
    </header>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: "20px",
        backgroundColor: "#fff",
    },
    leftSide: { 
        display: "flex", 
        alignItems: "center", 
        gap: "1rem" 
    },
    button: {
        background: "none",
        border: "none",
        cursor: "pointer",
    },
    searchInput: { 
        padding: "0.4rem 0.6rem",
        borderRadius: "4px",
        border: "1px solid #ccc"
    },
    rightSide: { 
        display: "flex", 
        alignItems: "center", 
        gap: "1rem" 
    },
    userProfile: { 
        display: "flex", 
        alignItems: "center", 
        gap: "0.5rem" 
    },
    avatar: { 
        width: "32px", 
        height: "32px", 
        borderRadius: "50%" 
    },
    userDetails: { 
        display: "flex", 
        flexDirection: "column", 
        lineHeight: "1.2",
        textAlign: "right"
    },
};

export default Header;
