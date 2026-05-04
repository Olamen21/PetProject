import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import EditProfileHeader from "../components/EditProfileScreen/EditProfileHeader";
import EditProfileForm from "../components/EditProfileScreen/EditProfileForm";
import CommonButton from "@/app/shared/components/CommonButton";
import { Colors } from "@/app/constants/Colors";
import { router } from "expo-router";
import api from "../../../../api/axiosInstance";
import { getProfile, updateProfile } from "../services/userService";
import CommonMessage from "@/app/shared/components/CommonMessage";
import { useFocusEffect } from "expo-router";
const EditProfileScreen = () => {
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    address: "",
    dob: "",
    avatar_url: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success" | "warning" | "info";
    text: string;
  } | null>(null);

  useFocusEffect(
    useCallback(() => {
      const loadUserData = async () => {
        try {
          const data = await getProfile();
          setForm({
            full_name: data.full_name || "",
            phone: data.phone || "",
            address: data.address || "",
            dob: data.date_of_birth || "",
            avatar_url: data.avatar_url || "",
          });
        } catch (error) {
          setMessage({
            type: "error",
            text: "Unable to fetch user information",
          });
        }
      };

      loadUserData();

      return () => {
        setMessage(null);
      };
    }, []),
  );

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleUpdate = async () => {
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(form.phone)) {
      setMessage({
        type: "warning",
        text: "Phone number must contain 10 digits and start with 0",
      });

      return;
    }

    if (form.dob) {
      const selectedYear = new Date(form.dob).getFullYear();
      const currentYear = new Date().getFullYear();
      if (selectedYear <= 1900 || selectedYear >= currentYear) {
        setMessage({
          type: "warning",
          text:
            "Year of birth must be greater than 1900 and less than " +
            currentYear,
        });

        return;
      }
    } else {
      setMessage({
        type: "warning",
        text: "Date of birth cannot be empty",
      });

      return;
    }

    try {
      setLoading(true);

      const updatePayload = {
        full_name: form.full_name,
        phone: form.phone,
        address: form.address,
        date_of_birth: form.dob,
        avatar_url: form.avatar_url,
      };

      const res = await updateProfile(updatePayload);
      if (res.status === 200 || res.status === 201) {
        Alert.alert("Success", "Profile updated successfully!", [
          {
            text: "OK",
            onPress: () => router.replace("/(tabs)/ProfileScreen"),
          },
        ]);
      }
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      setMessage({
        type: "warning",
        text: "An error occurred while updating the profile",
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
        <EditProfileHeader
          avatarUrl={form.avatar_url || "https://via.placeholder.com/150"}
          onBack={handleCancel}
        />

        <EditProfileForm form={form} onChange={handleChange} />
        <View style={styles.message}>
          {message && (
            <CommonMessage type={message.type} message={message.text} />
          )}
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color={Colors.primary}
            style={{ marginTop: 20 }}
          />
        ) : (
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
              title="Save Changes"
              onPress={handleUpdate}
              backgroundColor={Colors.primary}
              textColor={Colors.white}
              style={{ width: "48%", marginLeft: 10 }}
              bordered={true}
              borderColor={Colors.border}
              borderWidth={2}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;

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
    marginBottom: 30,
    alignItems: "center",
  },
});
