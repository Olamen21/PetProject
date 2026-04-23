import Colors from "../../constants/Colors";
import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";

const NAV_ITEMS = [
 { key: "home", label: "Home", icon: "home-outline", route: "/home" },
  { key: "pet", label: "Pet profile", icon: "paw-outline", route: "/PetProfileScreen" },
  { key: "nutrition", label: "Nutrition", icon: "fast-food-outline", route: "/NutritionScreen" },
  { key: "health", label: "Vets", icon: "medkit-outline", route: "/MedicalRecordsAndVetsScreen" },
  { key: "calendar", label: "Reminder", icon: "calendar-outline", route: "/reminder" },
];
export default function BottomNavBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.route;
        return (
          <TouchableOpacity
            key={item.key}
            style={[styles.item, isActive && styles.activeItem]}
            onPress={() => router.push(item.route as any)}
          >
            <Ionicons
              name={item.icon as any}
              size={24}
              color={isActive ? Colors.white : Colors.text}
            />
            {isActive && (
              <Text style={styles.activeLabel}>{item.label}</Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: Colors.white,
    borderRadius: 100, 
    borderWidth: 1,
    borderColor: Colors.background,
    position: "absolute",
    bottom: 30,      
    left: 20,
    right: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
  },
  activeItem: {
    backgroundColor: Colors.primary,
  },
  activeLabel: {
    color: Colors.white,
    fontWeight: "600",
    marginLeft: 8,
    fontSize: 12,
  },
});