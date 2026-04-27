import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/app/constants/Colors";

const ChangePasswordHeader = ({ onBack }) => (
  <View style={styles.header}>
    <TouchableOpacity style={styles.backBtn} onPress={onBack}>
      <Ionicons name="arrow-back" size={24} color={Colors.white} />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>Change Password</Text>
  </View>
);

export default ChangePasswordHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    paddingVertical: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  backBtn: {
    position: "absolute",
    left: 20,
    top: 40,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
});
