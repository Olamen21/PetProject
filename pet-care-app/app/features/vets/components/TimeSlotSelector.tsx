import { Colors } from "@/app/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
interface TimeSlotSelectorProps {
  morningSlots: string[];
  eveningSlots: string[];
  onSelectTime?: (time: string) => void;
}

const TimeSlotSelector = ({ morningSlots, eveningSlots, onSelectTime }: TimeSlotSelectorProps) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const renderSlots = (slots: string[]) => (
    <View style={styles.slotContainer}>
      {slots.map((time) => {
        const isSelected = selectedTime === time;
        return (
          <TouchableOpacity
            key={time}
            style={[styles.slot, isSelected && styles.selectedSlot]}
            onPress={() => {
              setSelectedTime(time);
              onSelectTime?.(time);
            }}
          >
            <Text style={[styles.slotText, isSelected && styles.selectedText]}>
              {time}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Morning section */}
      <View style={styles.headerSection}>
        <Ionicons name="partly-sunny-outline" size={20} color={Colors.subtitleColor} />
        <Text style={styles.sectionTitle}>Morning</Text>
      </View>
      {renderSlots(morningSlots)}

      {/* Evening section */}
      <View style={styles.headerSection}>
        <Ionicons name="moon-outline" size={20} color={Colors.subtitleColor} />
        <Text style={styles.sectionTitle}>Evening</Text>
      </View>
      {renderSlots(eveningSlots)}
    </View>
  );
};



export default TimeSlotSelector;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "400",
    marginVertical: 8,
    color: Colors.subtitleColor,
  },
  slotContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  slot: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    margin: 4,
  },
  selectedSlot: {
    backgroundColor: Colors.orange,
    borderColor: Colors.orange,
  },
  slotText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text,
  },
  selectedText: {
    color: Colors.white,
  },
});
