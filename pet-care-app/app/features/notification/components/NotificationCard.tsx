import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/app/constants/Colors";

type CategoryType = "Medical Records" | "Payment" | "Vet & Appointment" | "Nutrition";

export type NotificationCardProps = {
  petName: string;
  time: string;
  message: string;
  category: CategoryType;
  state?: "Successful" | "Unsuccessful";
};

const categoryIcons: Record<NotificationCardProps["category"], string> = {
  "Medical Records": "medkit-outline",
  "Payment": "card-outline",
  "Vet & Appointment": "calendar-outline",
  "Nutrition": "fast-food-outline",
};

export default function NotificationCard({ 
  petName, 
  time, 
  message, 
  category,
  state 
} : NotificationCardProps) {
    const icon = categoryIcons[category];
    const stateStyle =
    state === "Successful"
      ? styles.stateSuccess
      : state === "Unsuccessful"
      ? styles.stateFail
      : null;

  return (
    <View style={styles.card}>
      {/* Icon bên trái */}
      <View style={styles.iconWrapper}>
        <Ionicons name={icon as any} size={24} color= {Colors.black} />
      </View>

      {/* Nội dung thông báo */}
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.petName}>{petName},{time}</Text>
          {state && (
            <View
              style={[
                styles.state,
                state === "Successful" ? styles.stateSuccess : styles.stateFail,
              ]}
            >
              <Text
                style={[
                  styles.stateText,
                  state === "Successful" ? {color: Colors.secondary} : {color: Colors.error},
                ]}
              >
                {state}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: Colors.white,
    padding: 12,
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
  },
  iconWrapper: {
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 20,
    backgroundColor: Colors.border,
    paddingVertical: 18,
    paddingHorizontal: 10,
  },
  content: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  petName: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.subtitleColor,
  },
  state: {
    backgroundColor: Colors.background,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 27,
  },
  stateSuccess: {
    backgroundColor: Colors.background, 
  },
  stateFail: {
    backgroundColor: Colors.failBackground, 
  },
  stateText: {
    fontSize: 10,
    fontWeight: "500"
  },
  message: {
    fontSize: 14,
    marginTop: 4,
    color: Colors.text,
    fontWeight: "500"
  },
  category: {
    fontSize: 12,
    marginTop: 6,
    color: Colors.subtitleColor,
    fontWeight: "500",
  },
});
