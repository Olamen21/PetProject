import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/app/constants/Colors";

type AppointmentInfoProps = {
  date: string;   
  time: string;   
};

const AppointmentInfo: React.FC<AppointmentInfoProps> = ({ date, time }) => {
  return (
    <View style={styles.container}>
      {/* Date box */}
      <View style={styles.card}>
        <Ionicons name="calendar-outline" size={24} color={Colors.black} />
        <Text style={styles.text}>{date}</Text>
      </View>

      {/* Time box */}
      <View style={styles.card}>
        <Ionicons name="time-outline" size={24} color={Colors.black} />
        <Text style={styles.text}>{time} </Text>
      </View>
    </View>
  );
};

export default AppointmentInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 6,
  },
  text: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text,
    flexShrink: 1,
  },
});
