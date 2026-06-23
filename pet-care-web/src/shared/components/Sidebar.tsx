import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaCalendarAlt,
  FaDog,
  FaStethoscope,
  FaUser,
  FaUsers,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { MdOutlineVaccines } from "react-icons/md";
import logo from "../../assets/logo.png";
import { Colors } from "../../constants/Colors";
import { getProfile } from "../../api/UserApi";
import type { User } from "../types/User";

const MENU_CONFIG = [
  { title: "GENERAL", isTitle: true },
  {
    title: "Appointments",
    path: "/vet/appointments",
    icon: <FaCalendarAlt />,
    roles: ["VET"],
  },
  {
    title: "Pet Profiles",
    path: "/pets",
    icon: <FaDog />,
    roles: ["VET", "ADMIN"],
  },
  { title: "MANAGEMENT", isTitle: true, roles: ["ADMIN"] },
  {
    title: "All Users",
    path: "/admin/management-user",
    icon: <FaUsers />,
    roles: ["ADMIN"],
  },
  { title: "CLINICAL", isTitle: true, roles: ["VET"] },
  {
    title: "Diagnosis",
    path: "/vet/diagnosis",
    icon: <FaStethoscope />,
    roles: ["VET"],
  },
  {
    title: "Vaccines",
    path: "/vaccines",
    icon: <MdOutlineVaccines />,
    roles: ["VET", "ADMIN"],
  },
  { title: "ACCOUNT", isTitle: true },
  {
    title: "My Profile",
    path: "/profile",
    icon: <FaUser />,
    roles: ["VET", "ADMIN"],
  },
  {
    title: "Log out",
    path: "/logout",
    icon: <FaSignOutAlt />,
    roles: ["VET", "ADMIN"],
  },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [user, setUser] = useState<User>();
  const [isOpen, setIsOpen] = useState(true);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getProfile();
        setUser(data);
      } catch (error) {
        console.error("Lỗi khi lấy profile:", error);
      }
    };
    loadData();
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const baseStyles: { [key: string]: React.CSSProperties } = {
    sidebar: {
      width: isOpen ? "250px" : "60px",
      backgroundColor: Colors.sidebar,
      height: "100vh",
      padding: "16px",
      borderRight: `1px solid ${Colors.border}`,
      fontFamily: "sans-serif",
      transition: "width 0.3s ease",
      overflow: "hidden",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    toggleBtn: {
      cursor: "pointer",
      marginBottom: "16px",
      fontSize: "20px",
      color: Colors.text,
    },
    sectionTitle: {
      fontSize: "12px",
      fontWeight: "bold",
      color: Colors.text,
      marginTop: "20px",
      marginBottom: "10px",
      display: isOpen ? "block" : "none",
    },
    navLinkText: {
      display: isOpen ? "inline" : "none",
    },
  };

  const navItemStyle = (active: boolean): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    justifyContent: isOpen ? "space-between" : "center",
    padding: "10px 12px",
    borderRadius: "8px",
    marginBottom: "6px",
    backgroundColor: active ? Colors.secondary : "transparent",
    cursor: "pointer",
  });

  return (
    <aside style={baseStyles.sidebar}>
      {/* Toggle button */}
      <div style={baseStyles.toggleBtn} onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </div>

      {/* Logo */}
      <div style={baseStyles.logo}>
        <img src={logo} alt="logo" style={{ width: 60, height: 60 }} />
        {isOpen && (
          <div>
            <div style={{ fontSize: "16px", fontWeight: 600 }}>PetCare</div>
            <div style={{ fontSize: "12px", color: Colors.text }}>
              Vet Portal
            </div>
          </div>
        )}
      </div>

      {/* Doctor Info */}
      {isOpen && (
        <div style={{ marginTop: "16px", marginBottom: "16px" }}>
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt="avatar"
                  style={{ width: "80px", height: "90px", borderRadius: "50%" }}
                />
              ) : (
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: Colors.primary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                  }}
                >
                  {user.full_name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
              <div>
                <div>{user.full_name}</div>
                <div style={{ fontSize: "12px", opacity: 0.8 }}>
                  {user.role}
                </div>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      )}

      {/* Menu */}
      {MENU_CONFIG.map((item, index) => {
        if (item.roles && user && !item.roles.includes(user.role)) return null;


        if (item.isTitle) {
          return (
            <div key={index} style={baseStyles.sectionTitle}>
              {item.title}
            </div>
          );
        }

        if (!item.path) return null;

        return (
          <Link
            key={index}
            to={item.path as string}
            style={{
              ...navItemStyle(isActive(item.path)),
              textDecoration: "none",
              color: Colors.text,
            }}
          >
            <span
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              {item.icon}{" "}
              <span style={baseStyles.navLinkText}>{item.title}</span>
            </span>
          </Link>
        );
      })}
    </aside>
  );
};

export default Sidebar;
