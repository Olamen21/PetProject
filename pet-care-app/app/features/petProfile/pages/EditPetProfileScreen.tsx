import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import CommonButton from "@/app/shared/components/CommonButton";
import PetAvatar from "../components/PetAvatar";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import HeaderBar from "@/app/shared/components/HeaderBar";
import BasicInfoCard from "../components/BasicInfoCard";
import { mockPets } from "../data/mockdata";
import { Pet } from "../types/Pet";
import HealthInfoCard from "../components/HealthInfoCard";

export default function EditPetProfileScreen() {
  const { petId } = useLocalSearchParams<{ petId: string }>();
  const pet = mockPets.find((p) => p.id === Number(petId)) || mockPets[0];
  const [selectedPet, setSelectedPet] = useState<Pet>(pet);

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
        <PetAvatar
          name=""
          editable
          onChangeAvatar={() => console.log("Chọn ảnh mới")}
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
          onPress={() => {}}
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
