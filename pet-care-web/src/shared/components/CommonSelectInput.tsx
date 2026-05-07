import React from "react";
import type { IconType } from "react-icons";
import { Colors } from "../../constants/Colors";

type Props = {
  label?: string;
  Icon?: IconType;
  iconSize?: number;
  iconColor?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  rightIcon?: React.ReactNode;
  containerStyle?: React.CSSProperties;
  selectStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  backgroundColor?: string;
  bordered?: boolean;
  borderColor?: string;
  borderWidth?: number;
};

const CommonSelectInput: React.FC<Props> = ({
  label,
  Icon,
  iconSize = 22,
  iconColor = Colors.secondary,
  placeholder,
  value,
  onChange,
  options,
  rightIcon,
  containerStyle,
  selectStyle,
  labelStyle,
  backgroundColor = Colors.white,
  bordered = true,
  borderColor = Colors.gray,
  borderWidth = 1.5,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
      {label && (
        <label
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: Colors.text,
            textAlign: "left",
            ...labelStyle,
          }}
        >
          {label}
        </label>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          borderRadius: 8,
          height: 48,
          paddingLeft: 12,
          paddingRight: 12,
          border: bordered ? `${borderWidth}px solid ${borderColor}` : "none",
          backgroundColor: backgroundColor || "transparent",
          ...containerStyle,
        }}
      >
        {Icon && <Icon size={iconSize} color={iconColor} style={{ marginRight: 10 }} />}
        <select
          value={value}
          onChange={onChange}
          style={{
            flex: 1,
            fontSize: "14px",
            fontWeight: "500",
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            ...selectStyle,
          }}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {rightIcon && <div>{rightIcon}</div>}
      </div>
    </div>
  );
};

export default CommonSelectInput;
