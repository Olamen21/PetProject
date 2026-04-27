import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import BottomNavBar from "@/app/shared/components/BottomNavBar";
import { Colors } from "@/app/constants/Colors";
import ProfileHeader from '../components/ProfileScreen/ProfileHeader'
import InfoCard from '../components/ProfileScreen/InfoCard'
import MenuCard from '../components/ProfileScreen/MenuCard'
const ProfileScreen = () => {
  const user = {
    full_name: "Thuy",
    email: "thuy@example.com",
    dob: "2004-05-28",
    phone: "0912 345 678",
    address: "Da Nang, Vietnam",
    avatar_url: "https://i.pinimg.com/736x/57/3c/9d/573c9d69a03dc06e6cd4b1939aa5d023.jpg",
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader user={user} />
        <InfoCard user={user} />
        <MenuCard />
      </ScrollView>
      <BottomNavBar />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background_light },
});
