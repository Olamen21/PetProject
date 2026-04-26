import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaDog,
  FaStethoscope,
  FaUser,
  FaCog,
  FaUsers,
  FaChartBar,
} from "react-icons/fa";
import logo from "../../assets/logo.png";
import { Colors } from "../../constants/Colors";
import { useAuth } from "../../context/AuthContext";

const MENU_CONFIG = [
  { title: "GENERAL", isTitle: true },
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <FaHome />,
    roles: ["VET", "ADMIN"],
  },
  {
    title: "Appointments",
    path: "/appointments",
    icon: <FaCalendarAlt />,
    roles: ["VET", "ADMIN"],
  },
  {
    title: "Pet Profiles",
    path: "/pets",
    icon: <FaDog />,
    roles: ["VET", "ADMIN"],
  },

  // Chỉ Admin thấy những mục này
  { title: "MANAGEMENT", isTitle: true, roles: ["ADMIN"] },
  {
    title: "All Users",
    path: "/admin/management-user",
    icon: <FaUsers />,
    roles: ["ADMIN"],
  },
  {
    title: "Revenue",
    path: "/admin/revenue",
    icon: <FaChartBar />,
    roles: ["ADMIN"],
  },

  { title: "CLINICAL", isTitle: true, roles: ["VET", "ADMIN"] },
  {
    title: "Diagnosis",
    path: "/diagnosis",
    icon: <FaStethoscope />,
    roles: ["VET"],
  }, // Chỉ Vet thấy

  { title: "ACCOUNT", isTitle: true },
  {
    title: "My Profile",
    path: "/profile",
    icon: <FaUser />,
    roles: ["VET", "ADMIN"],
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <FaCog />,
    roles: ["VET", "ADMIN"],
  },
];
const Sidebar: React.FC = () => {
  const location = useLocation();
  const user = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const baseStyles: { [key: string]: React.CSSProperties } = {
    sidebar: {
      width: "250px",
      backgroundColor: Colors.sidebar,
      height: "100vh",
      padding: "16px",
      borderRight: `1px solid ${Colors.border}`,
      fontFamily: "sans-serif",
      position: "fixed",
      top: 0,
      left: 0,
    },

    logo: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },

    title: {
      fontSize: "16px",
      fontWeight: 600,
    },
    subtitle: {
      fontSize: "12px",
      color: Colors.text,
    },
    sectionTitle: {
      fontSize: "12px",
      fontWeight: "bold",
      color: Colors.text,
      marginTop: "20px",
      marginBottom: "10px",
    },
    navLink: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      textDecoration: "none",
      color: Colors.text,
      fontSize: "14px",
    },
    badge: {
      backgroundColor: Colors.primary,
      color: "white",
      borderRadius: "50%",
      width: "22px",
      height: "22px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
    },
    doctorBox: {
      background: Colors.sidebar,
      borderRadius: "12px",
      padding: "16px",
      marginTop: "16px",
      marginBottom: "16px",
      color: Colors.text,
      border: `1px solid ${Colors.border}`,
    },
    divider: {
      borderTop: `1px solid ${Colors.border}`,
      margin: "16px 0",
    },

    doctorRow: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },

    avatar: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      background: Colors.primary,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      fontSize: "18px",
    },

    doctorName: {
      fontSize: "14px",
      fontWeight: 600,
    },

    doctorRole: {
      fontSize: "12px",
      opacity: 0.8,
    },

    status: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      backgroundColor: Colors.success,
      marginLeft: "4px",
    },
  };

  const navItemStyle = (active: boolean): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 12px",
    borderRadius: "8px",
    marginBottom: "6px",
    backgroundColor: active ? Colors.secondary : "transparent",
    cursor: "pointer",
  });

  return (
    <aside style={baseStyles.sidebar}>
      <div style={baseStyles.logo}>
        {" "}
        <img src={logo} alt="logo" style={{ width: 80, height: 80 }} />
        <div>
          <div style={baseStyles.title}>PetCare</div>
          <div style={baseStyles.subtitle}>Vet Portal</div>
        </div>
      </div>
      <div style={baseStyles.divider}></div>
      {/* DOCTOR INFO */}
      <div style={baseStyles.doctorBox}>
        {user ? (
          <div style={baseStyles.doctorRow}>
            {user.avatar ? (
              <img src={user.avatar} alt="avatar" style={baseStyles.avatar} />
            ) : (
              <div style={baseStyles.avatar}>
                {user.full_name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            <div>
              <div>{user.full_name}</div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div>{user.role}</div>
                <span style={baseStyles.status}></span>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div> // hoặc placeholder
        )}
      </div>
      <div style={baseStyles.divider}></div>

      {MENU_CONFIG.map((item, index) => {
        // 1. Kiểm tra xem Role của user có quyền xem mục này không
        if (item.roles && !item.roles.includes(user?.role)) return null;

        // 2. Nếu là tiêu đề (GENERAL, CLINICAL...)
        if (item.isTitle) {
          return (
            <div key={index} style={baseStyles.sectionTitle}>
              {item.title}
            </div>
          );
        }

        // 3. Nếu là link menu bình thường
        return (
          <Link
            key={index}
            to={item.path}
            style={{
              ...navItemStyle(isActive(item.path)),
              textDecoration: "none",
              color: Colors.text,
            }}
          >
            <span
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              {item.icon} {item.title}
            </span>
          </Link>
        );
      })}
    </aside>
  );
};

export default Sidebar;
