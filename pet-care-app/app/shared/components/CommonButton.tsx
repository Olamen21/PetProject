import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors"; 

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
  disabled?: boolean;
};

export default function CommonButton({
  title,
  onPress,
  iconName,
  iconSize = 24,
  backgroundColor = Colors.primary, 
  textColor = Colors.white,
  iconColor = Colors.white,
  style,
  textStyle,
  bordered = false,
  borderColor = Colors.primary,
  borderWidth = 1.5,
  disabled = false,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.button, 
        { backgroundColor }, 
        bordered && { borderWidth, borderColor,}, 
        style
      ]}
      onPress={onPress}
      activeOpacity={0.7} 
      disabled={disabled}
    >
      {iconName && (
        <Ionicons 
          name={iconName} 
          size={iconSize} 
          color={iconColor} 
          style={{ marginRight: 8 }} 
        />
      )}
      <Text style={[
        styles.text, 
        { color: textColor }, 
        textStyle
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14, 
    paddingHorizontal: 20,
    borderRadius: 12,    
  },
  text: {
    fontSize: 16,      
    fontWeight: "600",
  },
});