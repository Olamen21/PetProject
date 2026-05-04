import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

type Props = {
  label?: string;
  value?: string; // dạng YYYY-MM-DD
  onChange: (date: string) => void;
  placeholder?: string;
  icon?: keyof typeof Ionicons.glyphMap;
};

export default function CommonDateTimePicker({
  label,
  value,
  onChange,
  placeholder = "YYYY-MM-DD",
  icon = "calendar-outline",
}: Props) {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios"); // iOS giữ picker mở
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD
      onChange(formatted);
    }
  };

  return (
    <View style={{ marginBottom: 20 }}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Pressable
        style={styles.container}
        onPress={() => setShowPicker(true)}
      >
        <Ionicons
          name={icon}
          size={22}
          color={value ? Colors.primary : Colors.secondary}
          style={styles.icon}
        />
        <Text style={[styles.text, { color: value ? Colors.text : "#99A1AF" }]}>
          {value || placeholder}
        </Text>
      </Pressable>
      {showPicker && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
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
    borderWidth: 1.5,
    borderColor: Colors.gray,
  },
  icon: { marginRight: 10 },
  text: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
});
