import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/app/constants/Colors";

const InfoCard = ({ user }) => (
  <View style={styles.card}>
    <View style={styles.row}>
      <MaterialCommunityIcons name="map-marker" size={22} color={Colors.primary} />
      <Text style={styles.infoText}>{user.address}</Text>
    </View>
    <View style={styles.row}>
      <MaterialCommunityIcons name="phone" size={22} color={Colors.primary} />
      <Text style={styles.infoText}>{user.phone}</Text>
    </View>
    <View style={styles.row}>
      <MaterialCommunityIcons name="calendar" size={22} color={Colors.primary} />
      <Text style={styles.infoText}>{user.dob}</Text>
    </View>
  </View>
);

export default InfoCard;

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
  row: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  infoText: { marginLeft: 15, fontSize: 15, color: Colors.text },
});
