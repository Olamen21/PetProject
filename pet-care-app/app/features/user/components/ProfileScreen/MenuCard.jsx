import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/app/constants/Colors";
import { router } from "expo-router";

const MenuCard = () => (
  <View style={styles.card}>
    <TouchableRipple onPress={() => {router.replace("/(tabs)/ChangePasswordScreen")}}>
      <View style={styles.menuItem}>
        <MaterialCommunityIcons name="lock-reset" size={22} color={Colors.primary} />
        <Text style={styles.menuText}>Change Password</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color={Colors.gray} />
      </View>
    </TouchableRipple>

    <View style={styles.divider} />

    <TouchableRipple onPress={() => {}}>
      <View style={styles.menuItem}>
        <MaterialCommunityIcons name="calendar-check" size={22} color={Colors.primary} />
        <Text style={styles.menuText}>My Appointments</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color={Colors.gray} />
      </View>
    </TouchableRipple>

    <View style={styles.divider} />

    <TouchableRipple onPress={() => {}}>
      <View style={styles.menuItem}>
        <MaterialCommunityIcons name="logout" size={22} color={Colors.error} />
        <Text style={[styles.menuText, { color: Colors.error }]}>Logout</Text>
      </View>
    </TouchableRipple>
  </View>
);

export default MenuCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  menuItem: { flexDirection: "row", alignItems: "center", paddingVertical: 12 },
  menuText: { flex: 1, marginLeft: 15, fontSize: 16, fontWeight: "600", color: Colors.text },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: 10 },
});
