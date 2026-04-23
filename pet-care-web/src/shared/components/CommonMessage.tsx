import React from "react";
import { IoIosAlert, IoIosCheckmarkCircle, IoIosWarning, IoIosInformationCircle } from "react-icons/io";
import { Colors } from "../../constants/Colors";

type Props = {
  type?: "error" | "success" | "warning" | "info";
  message: string;
  visible?: boolean;
};

const CommonMessage: React.FC<Props> = ({
  type = "info",
  message,
  visible = true,
}) => {
  if (!visible) return null;

  const config = {
    error: { color: Colors.error, Icon: IoIosAlert },
    success: { color: Colors.success, Icon: IoIosCheckmarkCircle },
    warning: { color: Colors.warning, Icon: IoIosWarning },
    info: { color: Colors.info, Icon: IoIosInformationCircle },
  };

  const { color, Icon } = config[type];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        borderWidth: 1.5,
        borderStyle: "solid",
        borderColor: color,
        borderRadius: 10,
        padding: 12,
        marginBottom: 12,
        backgroundColor: Colors.white,
        gap: 8,
      }}
    >
      <Icon size={20} color={color} />
      <span
        style={{
          fontSize: 14,
          fontWeight: 600,
          color,
          flexShrink: 1,
        }}
      >
        {message}
      </span>
    </div>
  );
};

export default CommonMessage;
