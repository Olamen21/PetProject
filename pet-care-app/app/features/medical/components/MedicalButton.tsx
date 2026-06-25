import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/app/constants/Colors"; 

type MedicalButtonProps = {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    selected?: boolean;
    onPress: () => void;
};

export const MedicalButton: React.FC<MedicalButtonProps> = ({ icon, label, selected, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={[
            styles.medicalBtn,
            { backgroundColor: selected ? Colors.primary : Colors.white },
            ]}
        >
        <Ionicons 
            name={icon} 
            color={selected ? Colors.white : Colors.black} 
            size={28} 
        />
      </View>
      <Text style={styles.textMedical}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center", 
    marginHorizontal: 8,
  },
  medicalBtn: {
    padding: 10,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  textMedical: {
    fontSize: 10,
    fontWeight: "500",
    marginTop: 6, 
    textAlign: "center", 
  },
});
