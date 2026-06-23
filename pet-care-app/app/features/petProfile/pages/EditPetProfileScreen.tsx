import CommonButton from "@/app/shared/components/CommonButton";
import CommonMessage from "@/app/shared/components/CommonMessage";
import HeaderBar from "@/app/shared/components/HeaderBar";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Pet } from "../../../shared/types/Pet";
import BasicInfoCard from "../components/BasicInfoCard";
import HealthInfoCard from "../components/HealthInfoCard";
import PetAvatar from "../components/PetAvatar";
import {
  getAllBreed,
  getPetById,
  updatePet
} from "../services/PetApi";
import type { Breed } from "../types/Breed";

export default function EditPetProfileScreen() {
  const { petId } = useLocalSearchParams<{ petId: string }>();
  const router = useRouter();
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [isNewAvatar, setIsNewAvatar] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success" | "warning" | "info";
    text: string;
  } | null>(null);
  const [breeds, setBreeds] = useState<Breed[]>([]);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const breedsData = await getAllBreed();
        setBreeds(breedsData);
        if (!petId) return;
        const data = await getPetById(petId);
        setSelectedPet(data);
        setAvatarUri(data.avatar_url ?? null);
      } catch (error) {
        console.error("Không thể tải pet:", error);
      }
    };

    fetchPet();
  }, [petId]);

  const handleChangeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
      setIsNewAvatar(true); // <--- ĐÁNH DẤU ĐÂY LÀ ẢNH MỚI
    }
  };

  if (!selectedPet) {
    return <Text>Đang tải dữ liệu thú cưng...</Text>;
  }

  const handleChangePet = async () => {
    try {
      if (!selectedPet) return;

      const allergiesValue = Array.isArray(selectedPet.allergies)
        ? selectedPet.allergies.join(", ")
        : selectedPet.allergies;
      console.log("img: " + selectedPet.avatar_url);

      // Tạo FormData
      const formData = new FormData();
      formData.append("name", selectedPet.name);
      formData.append("species", selectedPet.species);
      formData.append("breed_id", String(selectedPet.breed_id));
      formData.append("gender", selectedPet.gender);
      formData.append("date_of_birth", selectedPet.date_of_birth);
      formData.append("weight", String(selectedPet.weight));
      formData.append("height", String(selectedPet.height));
      formData.append("neutered", String(selectedPet.neutered));
      formData.append("allergies", allergiesValue ?? "");

      if (avatarUri && isNewAvatar) {
        const uriParts = avatarUri.split(".");
        const fileExtension = uriParts[uriParts.length - 1].toLowerCase();

        const fileToUpload = {
          uri: avatarUri,
          name: `avatar.${fileExtension}`, 
          type: `image/${fileExtension === "jpg" ? "jpeg" : fileExtension}`, 
        };

        formData.append("file", fileToUpload as any);

        console.log("Đã đóng gói file cho App:", fileToUpload);
      }

      const response = await updatePet(selectedPet.id, formData);
      setIsNewAvatar(false);
      setSelectedPet(response.data);
      setMessage({
        type: "success",
        text: "Cập nhật hồ sơ thú cưng thành công!",
      });
      router.push("/(tabs)/PetProfileScreen");
    } catch (error) {
      console.error("Không thể cập nhật pet:", error);
      setMessage({ type: "error", text: "Có lỗi xảy ra khi lưu thay đổi." });
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBar
        title="Edit pet's profile"
        leftIcons={[
          {
            type: "ion",
            name: "chevron-back-outline",
            onPress: () => router.push("/(tabs)/PetProfileScreen"),
          },
        ]}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {message && (
          <CommonMessage type={message.type} message={message.text} />
        )}

        <PetAvatar
          name={selectedPet.name}
          avatarUri={avatarUri || undefined}
          editable
          onChangeAvatar={handleChangeAvatar}
        />

        <Text style={styles.sectionTitle}>Basic Information</Text>

        <BasicInfoCard
          pet={selectedPet}
          setPet={setSelectedPet}
          breeds={breeds}
        />

        <HealthInfoCard pet={selectedPet} setPet={setSelectedPet} />

        <CommonButton
          title="Save Changes"
          onPress={handleChangePet}
          backgroundColor="#5A7863"
          textColor="#fff"
          style={{ marginTop: 24 }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { marginTop: 10 },
  container: { flex: 1, backgroundColor: "#FAFAFA", padding: 16 },
  scrollView: { flex: 1, marginTop: 10 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2D3748",
    marginTop: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#2D3748",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
});
