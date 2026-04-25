import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaDog,
  FaComments,
  FaStethoscope,
  FaSyringe,
  FaUser,
  FaCog,
} from "react-icons/fa";
import logo from "../../assets/logo.png";
import { Colors } from "../../constants/Colors";
import { useAuth } from "../../context/AuthContext";

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

      {/* CHÍNH */}
      <div style={baseStyles.sectionTitle}>GENERAL</div>
      <Link
        to="/dashboard"
        style={{
          ...navItemStyle(isActive("/dashboard")),
          textDecoration: "none",
          color: Colors.text,
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaHome /> Dashboard
        </span>
      </Link>

      <Link
        to="/appointments"
        style={{
          ...navItemStyle(isActive("/appointments")),
          textDecoration: "none",
          color: Colors.text,
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaCalendarAlt /> Appointments
        </span>
      </Link>

      <Link
        to="/pets"
        style={{
          ...navItemStyle(isActive("/pets")),
          textDecoration: "none",
          color: Colors.text,
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaDog /> Pet Profiles
        </span>
      </Link>

      <Link
        to="/consult"
        style={{
          ...navItemStyle(isActive("/consult")),
          textDecoration: "none",
          color: Colors.text,
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaComments /> Online Consultation
        </span>
      </Link>

      <div style={baseStyles.sectionTitle}>CLINICAL</div>
      {/* CLINICAL */}
      <Link
        to="/diagnosis"
        style={{
          ...navItemStyle(isActive("/diagnosis")),
          textDecoration: "none",
          color: Colors.text,
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaStethoscope /> Diagnosis & Prescriptions
        </span>
      </Link>
      <Link
        to="/vaccines"
        style={{
          ...navItemStyle(isActive("/vaccines")),
          textDecoration: "none",
          color: Colors.text,
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaSyringe /> Vaccine & Tests
        </span>
      </Link>

      {/* TÀI KHOẢN */}
      <div style={baseStyles.sectionTitle}>ACCOUNT</div>

      <Link
        to="/profile"
        style={{
          ...navItemStyle(isActive("/profile")),
          textDecoration: "none",
          color: Colors.text,
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaUser /> My Profile
        </span>
      </Link>

      <Link
        to="/settings"
        style={{
          ...navItemStyle(isActive("/settings")),
          textDecoration: "none",
          color: Colors.text,
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaCog /> Settings
        </span>
      </Link>
    </aside>
  );
};

export default Sidebar;
