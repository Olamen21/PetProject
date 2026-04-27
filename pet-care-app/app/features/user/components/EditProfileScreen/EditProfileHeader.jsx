import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/app/constants/Colors";

const EditProfileHeader = ({ avatarUrl, onBack }) => (
  <View style={styles.header}>
    <TouchableOpacity style={styles.backBtn} onPress={onBack}>
      <Ionicons name="arrow-back" size={24} color={Colors.white} />
    </TouchableOpacity>

    <View style={{ alignItems: "center" }}>
      <Avatar.Image size={100} source={{ uri: avatarUrl }} />
      <TouchableOpacity style={styles.changeAvatarBtn}>
        <Feather name="camera" size={16} color={Colors.white} />
        <Text style={styles.changeAvatarText}>Change</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default EditProfileHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    paddingVertical: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
    position: "relative",
  },
  backBtn: {
    position: "absolute",
    left: 20,
    top: 40,
    padding: 8,
  },
  changeAvatarBtn: {
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: Colors.gray_light,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: "center",
  },
  changeAvatarText: { color: Colors.white, marginLeft: 5, fontSize: 13 },
});
