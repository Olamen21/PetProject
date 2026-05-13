import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/app/constants/Colors";

type InfoRowProps = {
  icon: keyof typeof Ionicons.glyphMap; 
  label: string;                       
};

export const InfoRow: React.FC<InfoRowProps> = ({ icon, label }) => {
  return (
    <View style={styles.row}>
      <Ionicons name={icon} size={16} color= {Colors.text} />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,              
    borderWidth: 1,            
    borderColor: "#ccc",       
    borderRadius: 64,           
    backgroundColor: Colors.white,
    marginRight: 5,
    marginTop: 5,
  },
  text: {
    marginLeft: 10,
    fontSize: 10,
    color: Colors.text,
  },
});
