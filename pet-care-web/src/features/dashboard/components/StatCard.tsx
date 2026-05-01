import React from "react";
import { Colors } from "../../../constants/Colors";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  iconBg?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, iconBg }) => {
  return (
    <div
      style={styles.container}
    >
      {/* Icon */}
      <div style={{ ...styles.iconContainer, backgroundColor: iconBg }}>
        {icon}
      </div>

      {/* Nội dung */}
      <div style={{ textAlign: "center" }}>
        <div style={styles.title}>
          {title}
        </div>
        <div style={styles.value}>
          {value}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        flex: "1",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        backgroundColor: "#fff",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        width: "100%",
    },
    iconContainer: { 
        fontSize: "48px",  
        padding: "20px",
    },
    title: { 
        fontSize: "16px", 
        fontWeight: "bold", 
        color: Colors.text_secondary
    },
    value: { 
        fontSize: "30px", 
        fontWeight: "bold", 
        color: Colors.text 
    }
};

export default StatCard;
