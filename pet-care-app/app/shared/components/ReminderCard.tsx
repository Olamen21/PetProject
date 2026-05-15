import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/app/constants/Colors"; 

export type ReminderCardProps = {
  petName: string;
  treatment: string;
  dose: string;
  time: string;
  task: "Meal" | "Vitamin" | "Pill" | "Drop" | "Vaccine" | "Appointment" | "Beauty" | "Activity";
};

const taskIcons: Record<ReminderCardProps["task"], string> = {
  "Meal": "fast-food-outline",
  "Vitamin": "nutrition-outline",
  "Pill": "medkit-outline",
  "Drop": "water-outline",
  "Vaccine" : "bandage-outline",
  "Appointment" : "calendar-outline",
  "Beauty" : "flower-outline",
  "Activity" : "walk-outline",
};

export const ReminderCard: React.FC<ReminderCardProps> = ({ 
  petName, 
  treatment, 
  dose, 
  time,
  task }) => {
    const icon = taskIcons[task];
    const [checked, setChecked] = useState(false);
    return (
        <View style={styles.card}>
            {/* Icon bên trái */}
            <View style={styles.iconBox}>
                <Ionicons name= {icon as any} size={24} color={Colors.black} />
            </View>

            {/* Nội dung chính */}
            <View style={styles.info}>
                <Text style={styles.petName}>{petName}</Text>
                <Text style={styles.treatment}>{treatment}</Text>
                <Text style={styles.dose}>{dose}</Text>
            </View>

            {/* Thời gian + checkbox */}
            <View style={styles.rightSection}>
                <Text style={styles.time}>{time}</Text>
                <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => setChecked(!checked)}
                >
                    {checked && (
                        <Ionicons
                        name="checkmark-outline"
                        size={26}
                        color= {Colors.check}
                        />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 10,
  },
  iconBox: {
    width: 48,
    height: 58,
    borderRadius: 120,
    backgroundColor: Colors.gray,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  petName: {
    fontSize: 10,
    color: Colors.gray,
  },
  treatment: {
    fontSize: 14,
    color: Colors.text,
  },
  dose: {
    fontSize: 12,
    color: Colors.text,
  },
  rightSection: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  time: {
    fontSize: 14,
    fontWeight: "400",
  },
  checkbox: {
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: "#a5a5a5",
    borderRadius: 8,
  },
});
