import BottomNavBar from "@/app/shared/components/BottomNavBar";
import CommonButton from "@/app/shared/components/CommonButton";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import AvatarSection from "../components/AvatarSection";
import HealthSection from "../components/HealthSection";
import InfoCards from "../components/InfoCards";
import PhotoCard from "../components/PhotoCard";
import TasksSection from "../components/TasksSection";
import HeaderBar from "@/app/shared/components/HeaderBar";
import { useState } from "react";
import { Pet } from "../types/Pet";

export default function PetProfileScreen() {
  const router = useRouter();

  const pet = [{
    id: 1,
    name: "Tommy",
    breed: "Beagle",
    birthday: "23 Oct 2023",
    gender: "Male" as const,
    reproStatus: "Neutered",
    photos: "",
  },
  {
    id: 2,
    name: "Kitty",
    breed: "Siamese",
    birthday: "14 May 2022",
    gender: "Female" as const,
    photos: "",
    reproStatus: "Neutered",
  },
];

  const [selectedPet, setSelectedPet] = useState<Pet>(pet[0]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderBar title={`${selectedPet.name}'s profile`} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <AvatarSection pets={pet} selectedPet={selectedPet} onSelectPet={setSelectedPet} />
        <PhotoCard onAddPhoto={() => {}} />
        <InfoCards pet={selectedPet} />
        <CommonButton
          title="Complete your pet's profile"
          onPress={() => router.replace("/(tabs)/EditPetProfileScreen")}
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
