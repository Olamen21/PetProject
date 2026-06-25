import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/app/constants/Colors";

type InfoRowProps = {
  icon: any; 
  label: string;                       
};

export const InfoRow: React.FC<InfoRowProps> = ({ icon, label }) => {

  if(!label || label.trim() === "") return null;

  return (
    <View style={styles.row}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={14} color= {Colors.text} />
      </View>
      <Text style={styles.text} numberOfLines={1}>{label} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: "#F0F4F8",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginLeft: 10,
    fontSize: 10,
    color: Colors.text,
  },
});
