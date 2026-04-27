import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

type Props = {
  label?: string;
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
  label,
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
  const [focused, setFocused] = useState(false);

  return (
    <View style={{ marginBottom: 20 }}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.container,
          { backgroundColor },
          bordered && { borderWidth, borderColor },
          focused && { borderColor: Colors.primary, shadowColor: Colors.primary },
          containerStyle,
        ]}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={iconSize}
            color={value !== "" || focused ? Colors.primary : iconColor}
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
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...rest}
        />
        {rightIcon}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: Colors.subtitleColor,
    marginBottom: 6,
    fontWeight: "600",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 15,
    height: 56,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  icon: { marginRight: 10 },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    fontWeight: "500",
  },
});
