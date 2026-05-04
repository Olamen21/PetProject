import React, { useEffect, useState } from "react"; // 1. Thêm useState, useEffect
import { View, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import BottomNavBar from "@/app/shared/components/BottomNavBar";
import { Colors } from "@/app/constants/Colors";
import ProfileHeader from "../components/ProfileScreen/ProfileHeader";
import InfoCard from "../components/ProfileScreen/InfoCard";
import MenuCard from "../components/ProfileScreen/MenuCard";
import { getProfile } from "../services/userService";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

const ProfileScreen = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchProfile = async () => {
        try {
          const data = await getProfile();
          setUser(data);
        } catch (error) {
          console.error("Lỗi khi lấy profile:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();

      return () => {};
    }, []),
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {user && (
          <>
            <ProfileHeader user={user} />
            <InfoCard user={user} />
            <MenuCard />
          </>
        )}
      </ScrollView>
      <BottomNavBar />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background_light },
});
