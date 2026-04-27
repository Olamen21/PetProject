import React, { useState } from "react";
import { View, ScrollView, Alert, StyleSheet } from "react-native";
import { Colors } from "@/app/constants/Colors";
import ChangePasswordHeader from "../components/ChangePasswordScreen/ChangePasswordHeader";
import ChangePasswordForm from "../components/ChangePasswordScreen/ChangePasswordForm";
import CommonButton from "@/app/shared/components/CommonButton";
import { router } from "expo-router";

const ChangePasswordScreen = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [secure, setSecure] = useState({
    current: true,
    new: true,
    confirm: true,
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const toggleSecure = (field) => {
    setSecure({ ...secure, [field]: !secure[field] });
  };

  const handleSubmit = () => {
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      return Alert.alert("Error", "Please fill all fields");
    }
    if (form.newPassword.length < 6) {
      return Alert.alert("Error", "Password must be at least 6 characters");
    }
    if (form.newPassword !== form.confirmPassword) {
      return Alert.alert("Error", "Passwords do not match");
    }
    Alert.alert("Success", "Password changed successfully!");
  };

  const handleCancel = () => {
    router.replace("/(tabs)/ProfileScreen")
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ChangePasswordHeader onBack={() => router.replace("/(tabs)/ProfileScreen")} />
        <ChangePasswordForm
          form={form}
          secure={secure}
          onChange={handleChange}
          toggleSecure={toggleSecure}
        />

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
            title="Change Password"
            onPress={handleSubmit}
            backgroundColor={Colors.primary}
            textColor={Colors.white}
            style={{ flex: 1, marginLeft: 10 }}
            bordered={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background_light },
  buttonRow: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 20,
  },
});
