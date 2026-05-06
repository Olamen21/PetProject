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
import { getProfile, updateProfile } from "../services/userService";
import CommonMessage from "@/app/shared/components/CommonMessage";
import { useFocusEffect } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need access to your photos!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8, 
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setForm({ ...form, avatar_url: result.assets[0].uri }); 
    }
  };

  const handleUpdate = async () => {
  try {
    setLoading(true);
    setMessage(null);

    // Kiểm tra số điện thoại
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(form.phone)) {
      setMessage({
        type: "error",
        text: "Phone number must have 10 digits and start with 0!",
      });
      return;
    }

    // Kiểm tra ngày sinh
    if (form.dob) {
      const selectedYear = new Date(form.dob).getFullYear();
      const currentYear = new Date().getFullYear();
      if (selectedYear <= 1900 || selectedYear >= currentYear) {
        setMessage({
          type: "error",
          text:
            "Year of birth must be greater than 1900 and less than " +
            currentYear,
        });
        return;
      }
    } else {
      setMessage({ type: "error", text: "Date of birth cannot be empty" });
      return;
    }

    // Chuẩn bị FormData giống web
    const data = new FormData();
    data.append("full_name", form.full_name);
    data.append("phone", form.phone);
    data.append("address", form.address);
    data.append("date_of_birth", form.dob);

    // Nếu có ảnh mới chọn từ RN (ImagePicker)
    if (selectedImage) {
      const filename = selectedImage.split("/").pop();
      const match = /\.(\w+)$/.exec(filename || "");
      const type = match ? `image/${match[1]}` : `image`;

      data.append("file", {
        uri: selectedImage,
        name: filename,
        type: type,
      } as any);
    }

    // Các field khác
    data.append("bio", form.bio || "");
    data.append("clinic_room", form.clinicRoom || "");
    data.append(
      "tags",
      Array.isArray(form.tags) ? form.tags.join(", ") : form.tags || "",
    );

    // Gửi request
    const res = await updateProfile(data);

    if (res.status === 200 || res.status === 201) {
      Alert.alert("Success", "Cập nhật thành công", [
        {
          text: "OK",
          onPress: () => router.replace("/(tabs)/ProfileScreen"),
        },
      ]);
    }
  } catch (error) {
    console.error("Lỗi cập nhật:", error);
    setMessage({ type: "error", text: "Có lỗi xảy ra khi cập nhật" });
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
          onPickImage={handlePickImage}
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
