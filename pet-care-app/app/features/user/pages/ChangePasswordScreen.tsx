import React, { useState, useCallback } from "react";
import { View, ScrollView, Alert, StyleSheet } from "react-native";
import { Colors } from "@/app/constants/Colors";
import ChangePasswordHeader from "../components/ChangePasswordScreen/ChangePasswordHeader";
import ChangePasswordForm from "../components/ChangePasswordScreen/ChangePasswordForm";
import CommonButton from "@/app/shared/components/CommonButton";
import { router, useFocusEffect } from "expo-router";
import api from "../../../../api/axiosInstance";
import CommonMessage from "@/app/shared/components/CommonMessage";
import { changePassword } from "../services/userService";

const ChangePasswordScreen = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState<{
    type: "error" | "success" | "warning" | "info";
    text: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

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
  useFocusEffect(
    useCallback(() => {
      return () => {
        setForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setMessage(null);
      };
    }, []),
  );

  const handleSubmit = async () => {
    const { currentPassword, newPassword, confirmPassword } = form;
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      return setMessage({
        type: "error",
        text: "Please fill all fields",
      });
    }
    if (form.newPassword.length < 6) {
      return setMessage({
        type: "error",
        text: "Password must be at least 6 characters",
      });
    }
    if (form.newPassword !== form.confirmPassword) {
      return setMessage({
        type: "error",
        text: "Passwords do not match",
      });
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return setMessage({
        type: "error",
        text: "The new password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.",
      });
    }

    try {
      setLoading(true);
     const res = await changePassword(currentPassword, newPassword);
      if (res.status === 200 || res.status === 201) {
        Alert.alert("Thành công", "Mật khẩu đã được thay đổi.", [
          {
            text: "OK",
            onPress: () => router.replace("/(tabs)/ProfileScreen"),
          },
        ]);
      }
    } catch (error: any) {
      console.error("Lỗi đổi mật khẩu:", error);
      const errorMsg =
        error.response?.data?.message || "Đổi mật khẩu thất bại.";
      setMessage({
        type: "error",
        text: errorMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.replace("/(tabs)/ProfileScreen");
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ChangePasswordHeader
          onBack={() => router.replace("/(tabs)/ProfileScreen")}
        />
        <ChangePasswordForm
          form={form}
          secure={secure}
          onChange={handleChange}
          toggleSecure={toggleSecure}
        />
        <View style={styles.message}>
          {message && (
            <CommonMessage type={message.type} message={message.text} />
          )}
        </View>

        <View style={styles.buttonRow}>
          <CommonButton
            title="Cancel"
            onPress={handleCancel}
            backgroundColor={Colors.white}
            textColor={Colors.error}
            style={{ width: "48%" }}
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
  message: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  buttonRow: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 20,
  },
});
