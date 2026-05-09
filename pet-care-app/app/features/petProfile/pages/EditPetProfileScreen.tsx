import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import CommonButton from "@/app/shared/components/CommonButton";
import PetAvatar from "../components/PetAvatar";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import HeaderBar from "@/app/shared/components/HeaderBar";
import BasicInfoCard from "../components/BasicInfoCard";
import { Pet } from "../types/Pet";
import HealthInfoCard from "../components/HealthInfoCard";
import { getPetById, updatePetProfile } from "../services/PetApi";
import * as ImagePicker from "expo-image-picker";
import CommonMessage from "@/app/shared/components/CommonMessage";

export default function EditPetProfileScreen() {
  const { petId } = useLocalSearchParams<{ petId: string }>();
  const router = useRouter();
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "error" | "success" | "warning" | "info"; text: string } | null>(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
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
    // xin quyền truy cập thư viện ảnh
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      setMessage({ type: "error", text: "Bạn cần cấp quyền truy cập ảnh!" });
      return;
    }

    // mở thư viện ảnh
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri); // cập nhật ảnh mới
    }
  };

  if (!selectedPet) {
    return <Text>Đang tải dữ liệu thú cưng...</Text>;
  }

  const handleChangePet = async () => {
    try {
      if (!selectedPet) return;

      const updatePet = await updatePetProfile(selectedPet.id, {
        name: selectedPet.name,
        species: selectedPet.species,
        breed: selectedPet.breed,
        gender: selectedPet.gender,
        date_of_birth: selectedPet.date_of_birth,
        weight: selectedPet.weight,
        height: selectedPet.height,
        neutered: selectedPet.neutered,
        allergies: selectedPet.allergies
      });

      setSelectedPet(updatePet);
      setMessage({ type: "success", text: "Cập nhật hồ sơ thú cưng thành công!" });
      router.push("/(tabs)/PetProfileScreen");
    } catch (error) {
      console.error("Không thể cập nhật pet:", error);
      setMessage({ type: "error", text: "Có lỗi xảy ra khi lưu thay đổi." });
    }
  }

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
          name= {selectedPet.name}
          avatarUri={avatarUri || undefined}
          editable
          onChangeAvatar={handleChangeAvatar}
        />

        <Text style={styles.sectionTitle}>Basic Information</Text>

        <BasicInfoCard
          pet={selectedPet}
          setPet={setSelectedPet}
        />

        <HealthInfoCard 
          pet={selectedPet}
          setPet={setSelectedPet}
        />

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
