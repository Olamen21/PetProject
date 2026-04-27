import React, { useState } from "react";
import { View, ScrollView, Alert, StyleSheet } from "react-native";
import EditProfileHeader from "../components/EditProfileScreen/EditProfileHeader";
import EditProfileForm from "../components/EditProfileScreen/EditProfileForm";
import CommonButton from "@/app/shared/components/CommonButton";
import { Colors } from "@/app/constants/Colors";
import { router } from "expo-router";

const EditProfileScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    full_name: "Thuy",
    email: "thuy@example.com",
    phone: "0912 345 678",
    address: "Da Nang, Vietnam",
    dob: "2004-05-28",
    
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSave = () => {
    Alert.alert("Success", "Profile updated successfully!");
  };
  const handleCancel = () => {
    router.replace("/(tabs)/ProfileScreen")
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <EditProfileHeader
          avatarUrl="https://i.pinimg.com/736x/57/3c/9d/573c9d69a03dc06e6cd4b1939aa5d023.jpg"
          onBack={() => router.replace("/(tabs)/ProfileScreen")}
        />

        <EditProfileForm form={form} onChange={handleChange} />
        <View style={styles.buttonRow}>
          <CommonButton
            title="Cancel"
            onPress={handleCancel}
            backgroundColor={Colors.white}
            textColor={Colors.error}
            style={{ width:"48%" }}
            bordered={true}
            borderColor={Colors.error}
            borderWidth={1.5}
          />
          <CommonButton
            title="Save Changes"
            onPress={() => {}}
            backgroundColor={Colors.primary}
            textColor={Colors.white}
            style={{ width:"48%", marginLeft:10 }}
            bordered={true}
            borderColor={Colors.border}
            borderWidth={2}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background_light },
  buttonRow: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 10,
    alignItems: "center"
  },
});
