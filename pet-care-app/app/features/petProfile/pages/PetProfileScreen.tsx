import BottomNavBar from "@/app/shared/components/BottomNavBar";
import CommonButton from "@/app/shared/components/CommonButton";
import { useFocusEffect, useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import AvatarSection from "../components/AvatarSection";
import HealthSection from "../components/HealthSection";
import InfoCards from "../components/InfoCards";
import PhotoCard from "../components/PhotoCard";
import TasksSection from "../components/TasksSection";
import HeaderBar from "@/app/shared/components/HeaderBar";
import React, { useEffect, useState } from "react";
import { Pet } from "../types/Pet";
import { getPetList } from "../services/PetApi";
import * as ImagePicker from "expo-image-picker";
import CommonMessage from "@/app/shared/components/CommonMessage";

export default function PetProfileScreen() {
  const router = useRouter();
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [photoUri, setPhotoUri] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<{ type: "error" | "success" | "warning" | "info"; text: string } | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchPets = async () => {
        try {
          const data = await getPetList();
          setPets(data);
          if (data.length > 0) {
            setSelectedPet(data[0]);
          }
        } catch (error) {
          console.error("Không thể tải pets:", error);
        }
      };
      fetchPets();
    }, [])
  );

  const handleAddPhoto = async () => {
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
      const uri = result.assets[0].uri;
      setPhotoUri(uri); 
    }
  };

  if (!selectedPet) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderBar title={`${selectedPet.name}'s profile`} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <AvatarSection pets={pets} selectedPet={selectedPet} onSelectPet={setSelectedPet} />
        {message && (
          <CommonMessage type={message.type} message={message.text} />
        )}
        <PhotoCard onAddPhoto={handleAddPhoto} photoUri={photoUri} />
        <InfoCards pet={selectedPet} />
        <CommonButton
          title="Complete your pet's profile"
          onPress={() => router.push({
            pathname: "/(tabs)/EditPetProfileScreen",
            params: { petId: selectedPet.id },
          })}
          iconName="clipboard-outline"
          iconColor="#fff"
          backgroundColor="#5A7863"
          textColor="#fff"
          style={styles.button}
        />
        <CommonButton
          title="Emergency"
          onPress={() => {}}
          iconName="call-outline"
          iconColor="#FF6B6B"
          backgroundColor="#ffffff"
          textColor="#FF6B6B"
          bordered
          borderColor="#FF6B6B"
          borderWidth={1.5}
          style={styles.button}
        />
        <HealthSection />
        <TasksSection />
      </ScrollView>

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },
  header: { marginTop: 20 },
  scrollView: { flex: 1, marginBottom: 140 },
  button: {
    flexDirection: "row",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginHorizontal: 16,
    marginBottom: 12,
  },
});
