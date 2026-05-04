import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/app/constants/Colors";
import { router } from "expo-router";
import { Image } from "expo-image";

const ProfileHeader = ({ user }) => (
  <View style={styles.header}>
    {user.avatar_url ? (
      <Image
        source={{ uri: user.avatar_url }}
        style={[styles.avatar, { width: 100, height: 100, borderRadius: 50 }]}
        contentFit="cover"
        transition={300}
      />
    ) : (
      <View
        style={[
          styles.avatarPlaceholder,
          { width: 100, height: 100, borderRadius: 50 },
        ]}
      >
        <Text style={styles.avatarText}>
          {user.full_name ? user.full_name.charAt(0).toUpperCase() : "?"}
        </Text>
      </View>
    )}
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
  avatarPlaceholder: {
    backgroundColor: Colors.secondary, 
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius:"50%",
     marginTop:"20",
  },
  avatarText: {
    color: Colors.white,
    fontSize: 40,
    fontWeight: "bold",
  },
  avatar: {
    borderWidth: 2,
    borderColor:  Colors.white,
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
