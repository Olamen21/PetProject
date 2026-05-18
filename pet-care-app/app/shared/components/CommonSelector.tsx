import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

type Props = {
  value?: string;
  placeholder?: string;
  onPress: () => void;
  label?: string; 
  disabled?: boolean;
};

export default function CommonSelector({
  value,
  placeholder = "Select an option",
  onPress,
  label,
  disabled = false,
}: Props) {
  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity 
        style={[
          styles.inputBox, 
          { borderColor: value ? Colors.primary : Colors.gray },
          disabled && styles.disabledInputBox
        ]} 
        onPress={onPress}
        activeOpacity={0.6}
      >
        <Text style={[styles.value, !value && styles.placeholder, disabled && styles.disabledText]}>
          {value || placeholder}
        </Text>
        <Ionicons 
          name="chevron-down" 
          size={20} 
          color={value ? Colors.primary : Colors.gray} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20, 
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    borderRadius: 12,   
    borderWidth: 1.5,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  value: {
    fontSize: 16,
    color: Colors.text,
  },
  placeholder: {
    color: "#999",
  },
  disabledInputBox: {
    backgroundColor: "#F1F5F9", 
    borderColor: "#E2E8F0",
  },
  disabledText: {
    color: "#94A3B8",
  }
});