import React from "react";
import type { IconType } from "react-icons";
import { Colors } from "../../constants/Colors";

type Props = {
  label?: string; // Tên của ô nhập liệu (ví dụ: Mật khẩu)
  Icon?: IconType;
  iconSize?: number;
  iconColor?: string;
  placeholder: string;
  value: string;
  onChangeText?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  secureTextEntry?: boolean;
  rightIcon?: React.ReactNode;
  containerStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties; // Thêm style cho label nếu cần
  backgroundColor?: string;
  bordered?: boolean;
  borderColor?: string;
  borderWidth?: number;
} & React.InputHTMLAttributes<HTMLInputElement>;

const CommonTextInput: React.FC<Props> = ({
  label,
  Icon,
  iconSize = 22, 
  iconColor = Colors.secondary, 
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  rightIcon,
  containerStyle,
  inputStyle,
  labelStyle,
  backgroundColor = Colors.white, 
  bordered = true, 
  borderColor = Colors.gray, 
  borderWidth = 1.5,
  ...rest
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
            ...labelStyle 
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
          border: bordered ? `${borderWidth}px solid ${borderColor}` : "none",
          backgroundColor: backgroundColor || "transparent",
          transition: "border-color 0.2s", 
          ...containerStyle,
        }}
      >
        {Icon && (
          <Icon
            size={iconSize}
            color={iconColor}
            style={{ marginRight: 10, flexShrink: 0 }}
          />
        )}
        <input
          placeholder={placeholder}
          value={value}
          onChange={onChangeText}
          type={secureTextEntry ? "password" : "text"}
          style={{
            flex: 1,
            fontSize: "14px",
            color: Colors.text,
            fontWeight: "500",
            border: "none",
            padding: "0 10px",
            outline: "none",
            backgroundColor: "transparent",
            ...inputStyle,
          }}
          {...rest}
        />
        {rightIcon && <div style={{ paddingRight: 12 }}>{rightIcon}</div>}
      </div>
    </div>
  );
}

export default CommonTextInput;