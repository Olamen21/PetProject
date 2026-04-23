import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

type Props = {
  title: string;
  onPress: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  iconColor?: string;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  bordered?: boolean;
  borderColor?: string;
  borderWidth?: number;
};

export default function CommonButton({
  title,
  onPress,
  iconName,
  iconSize = 24,
  iconColor = Colors.text,
  backgroundColor = Colors.primary,
  textColor = Colors.text,
  style,
  textStyle,
  bordered = false,
  borderColor = Colors.primary,
  borderWidth = 2,
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, bordered && { borderWidth, borderColor }, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {iconName && (
        <Ionicons name={iconName} size={iconSize} color={iconColor} style={{ marginRight: 8 }} />
      )}
      <Text style={[styles.text, { color: textColor }, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
  },
});