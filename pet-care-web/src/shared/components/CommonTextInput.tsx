import React from "react";
import type { IconType } from "react-icons";
import { theme } from "../../styles/theme";

type Props = {
  Icon?: IconType;
  iconSize?: number;
  iconColor?: string;
  placeholder: string;
  value: string;
  onChangeText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  secureTextEntry?: boolean;
  rightIcon?: React.ReactNode;
  containerStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  backgroundColor?: string;
  bordered?: boolean;
  borderColor?: string;
  borderWidth?: number;
} & React.InputHTMLAttributes<HTMLInputElement>;

const CommonTextInput: React.FC<Props> = ({
  Icon,
  iconSize = 22, 
  iconColor = theme.colors.secondary, 
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  rightIcon,
  containerStyle,
  inputStyle,
  backgroundColor = theme.colors.white, 
  bordered = true, 
  borderColor = theme.colors.gray, 
  borderWidth = 1.5,
  ...rest
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        borderRadius: 5,
        height: 45,
        border: bordered ? `${borderWidth}px solid ${borderColor}` : "none",
        backgroundColor: backgroundColor || "transparent",
        ...containerStyle,
      }}
    >
      {Icon && (
        <Icon
          size={iconSize}
          color={iconColor}
          style={{ marginRight: 10 }}
        />
      )}
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChangeText}
        type={secureTextEntry ? "password" : "text"}
        style={{
          flex: 1,
          fontSize: 13,
          color: theme.colors.text,
          fontWeight: "500",
          ...inputStyle,
           border: "none",
          padding: "0 10px",
          outline: "none",
        }}
        {...rest}
      />
      {rightIcon}
    </div>
  );
}

export default CommonTextInput;