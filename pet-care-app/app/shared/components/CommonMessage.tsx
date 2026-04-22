import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors"; 

type Props = {
  type?: "error" | "success" | "warning" | "info";
  message: string;
  visible?: boolean;
};

export default function CommonMessage({
  type = "info",
  message,
  visible = true,
}: Props) {
  if (!visible) return null;

  const config = {
    error: { color: Colors.error, icon: "alert-circle" },
    success: { color: Colors.success, icon: "checkmark-circle" },
    warning: { color: Colors.warning, icon: "warning" },
    info: { color: Colors.info, icon: "information-circle" },
  };

  const { color, icon } = config[type];

  return (
    <View style={[styles.container, { borderColor: color }]}>
      <Ionicons name={icon as any} size={20} color={color} />
      <Text style={[styles.text, { color }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 10, 
    padding: 12,
    marginBottom: 12,
    backgroundColor: Colors.white, 
    gap: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: "600", 
    flexShrink: 1,
  },
});