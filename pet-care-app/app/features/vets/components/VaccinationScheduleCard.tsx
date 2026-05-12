import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/app/constants/Colors";
import CommonButton from "@/app/shared/components/CommonButton";

type Dose = {
  label: string;   
  date: string;   
  time?: string;  
  status: "done" | "upcoming"; 
};

type VaccinationScheduleCardProps = {
  title: string;      
  subtitle: string;    
  nextDose: string;    
  doses: Dose[];
  onChangeSchedule?: () => void;
};

export const VaccinationScheduleCard: React.FC<VaccinationScheduleCardProps> = ({
  title,
  subtitle,
  nextDose,
  doses,
  onChangeSchedule,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.card}>
      {/* Header */}
       <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                <Ionicons
                    name={expanded ? "chevron-up-outline" : "chevron-down-outline"}
                    size={20}
                    color={Colors.black}
                />
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
            <Ionicons name="medkit-outline" size={16} color={Colors.black} />
            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <View style={styles.row}>
            <Ionicons name="calendar-clear-outline" size={16} color={Colors.black} />
            <Text style={styles.nextDose}>Next dose: {nextDose}</Text>
        </View>

        <View style={styles.divider} />

      {/* Danh sách các mũi tiêm */}
      {expanded && (
        <>
            {doses.map((dose, index) => (
            <View key={index} style={styles.doseRow}>
                <Text style={styles.doseLabel}>{dose.label}</Text>
                <Text style={styles.doseDate}>
                {dose.date} {dose.time ? `- ${dose.time}` : ""}
                </Text>
                {dose.status === "done" ? (
                <Ionicons name="checkmark-circle" size={20} color={Colors.check} />
                ) : (
                <Ionicons name="medkit-outline" size={20} color={Colors.warning} />
                )}
            </View>
            ))}

            <CommonButton
            title="Change Schedule"
            onPress={() => onChangeSchedule}
            />
        </>
        )}

    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 15,
    marginBottom: 50
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between", 
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",      
    alignItems: "center",      
    marginVertical: 4,
    gap: 10
  },
  subtitle: {
    fontSize: 12,
    color: Colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc", 
    marginBottom: 12,
    marginTop: 10,
  },
  nextDose: {
    fontSize: 13,
    color: Colors.text,
  },
  doseRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 6,
    marginBottom: 5,
  },
  doseLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  doseDate: {
    fontSize: 12,
    color: Colors.text,
    flex: 1,
    marginLeft: 8,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
