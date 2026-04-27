import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/app/constants/Colors";
import { router } from "expo-router";
import { Image } from "expo-image";

const ProfileHeader = ({ user }) => (
  <View style={styles.header}>
    <Image
      source={{ uri: user.avatar_url }}
      style={[styles.avatar, { width: 100, height: 100, borderRadius: 50 }]}
      contentFit="cover"
      transition={300}
    />
    <Text style={styles.title}>{user.full_name}</Text>
    <Text style={styles.caption}>{user.email}</Text>
    <TouchableOpacity
      style={styles.editBtn}
      onPress={() => router.replace("/(tabs)/EditProfileScreen")}
    >
      <Feather name="edit-3" size={18} color={Colors.white} />
    </TouchableOpacity>
  </View>
);

export default ProfileHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    alignItems: "center",
    paddingVertical: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatar: {
    borderWidth: 3,
    borderColor: Colors.white,
    marginBottom: 10,
  },
  title: { color: Colors.white, fontSize: 22, fontWeight: "bold" },
  caption: { color: Colors.gray, fontSize: 14 },
  editBtn: {
    position: "absolute",
    right: 20,
    top: 40,
    backgroundColor: "#ffffff33",
    padding: 8,
    borderRadius: 20,
  },
});
