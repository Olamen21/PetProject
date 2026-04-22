import React from "react";
import { Switch, Platform } from "react-native";
import { Colors } from "../../constants/Colors";

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function CommonSwitch({ value, onChange }: Props) {
  return (
    <Switch
      trackColor={{
        false: "#D0D5DD",
        true: Colors.secondary,
      }}
      thumbColor={value ? Colors.white : "#f4f3f4"}
      ios_backgroundColor="#D0D5DD"
      onValueChange={onChange}
      value={value}
      style={
        Platform.OS === "ios"
          ? { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }
          : {}
      }
    />
  );
}
