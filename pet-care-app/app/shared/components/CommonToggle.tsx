import { Colors } from "@/app/constants/Colors";
import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ToggleProps = {
  label: string;
  initialValue?: boolean;
  onToggle?: (value: boolean) => void;
  iconName?: keyof typeof Ionicons.glyphMap;
};

const CommonToggle: React.FC<ToggleProps> = ({ 
  label, 
  initialValue = false, 
  onToggle, 
  iconName 
}) => {
  const [isEnabled, setIsEnabled] = useState(initialValue);

  const toggleSwitch = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    if (onToggle) {
      onToggle(newValue);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {iconName && (
          <Ionicons 
            name={iconName} 
            size={20} 
            color={Colors.text} 
            style={{ marginRight: 8 }} 
          />
        )}
        <Text style={styles.label}>{label}</Text>
      </View>
      <Switch
        trackColor={{ false: "#767577", true: Colors.secondary }}
        thumbColor={Colors.white}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 6,
    marginHorizontal: 10,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
  },
});

export default CommonToggle;

