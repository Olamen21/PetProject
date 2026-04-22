import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

type Props = {
  icon?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  iconColor?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  backgroundColor?: string;
  bordered?: boolean;
  borderColor?: string;
  borderWidth?: number;
} & TextInputProps;

export default function CommonTextInput({
  icon,
  iconSize = 22, 
  iconColor = Colors.secondary, 
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  rightIcon,
  containerStyle,
  inputStyle,
  backgroundColor = Colors.white, 
  bordered = true, 
  borderColor = Colors.gray, 
  borderWidth = 1.5,
  ...rest
}: Props) {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor },
        bordered && { borderWidth, borderColor },
        bordered && value !== "" && { borderColor: Colors.primary },
        containerStyle,
      ]}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={iconSize}
          color={value !== "" ? Colors.primary : iconColor}
          style={styles.icon}
        />
      )}
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor="#99A1AF" 
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        underlineColorAndroid="transparent"
        selectionColor={Colors.primary} 
        {...rest}
      />
      {rightIcon}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 15,
    height: 56,
  },
  icon: { marginRight: 10 },
  input: { 
    flex: 1, 
    fontSize: 16, 
    color: Colors.text, 
    fontWeight: "500",
  },
});