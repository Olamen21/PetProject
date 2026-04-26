import React from "react";
import type { IconType } from "react-icons";
import { Colors } from "../../constants/Colors";

type Props = {
  title?: string;
  onClick: () => void;
  Icon?: IconType;
  iconSize?: number;
  iconColor?: string;
  backgroundColor?: string;
  textColor?: string;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  bordered?: boolean;
  borderColor?: string;
  borderWidth?: number;
};

const CommonButton: React.FC<Props> = ({
  title,
  onClick,
  Icon,
  iconSize = 24,
  backgroundColor = Colors.primary,
  textColor = Colors.text,
  iconColor = Colors.white,
  style,
  textStyle,
  bordered = false,
  borderColor = Colors.primary,
  borderWidth = 1.5,
}) => {
  return (
    <button
      onClick={onClick}
      onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
      onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "14px 20px",
        borderRadius: 12,
        backgroundColor: backgroundColor || "transparent",
        border: bordered ? `${borderWidth}px solid ${borderColor}` : "none",
        cursor: "pointer",
        ...style,
        transition: "0.2s",
      }}
    >
      {Icon && (
        <Icon
          size={iconSize}
          color={bordered ? textColor : iconColor}
          style={{ marginRight: 8, flexShrink: 0 }}
        />
      )}

      <span
        style={{
          fontSize: 16,
          fontWeight: 600,

          color: textColor,
          ...textStyle,
        }}
      >
        {title}
      </span>
    </button>
  );
};

export default CommonButton;
