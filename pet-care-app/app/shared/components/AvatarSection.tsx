import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import PetAvatar from "../../features/home/components/PetAvatar";
import { Pet } from "../types/Pet";


export default function AvatarSection({ pets, selectedPet, onSelectPet, }: {
  pets: Pet[];
  selectedPet: Pet | null;
  onSelectPet: (pet: Pet) => void;
 }) {
  return (
    <View style={styles.avatarSection}>
      {pets.length > 0 && selectedPet ? (
        pets.map((pet) => (
          <TouchableOpacity key={pet.id} onPress={() => onSelectPet(pet)}>
            <PetAvatar name={pet.name} avatarUri={pet.avatar_url} isSelected={selectedPet.id === pet.id} species={pet.species} />
          </TouchableOpacity>
        ))
      ) : (
        <View></View>
      )}

      <TouchableOpacity style={styles.addPetButton} onPress={() => router.push("/(tabs)/AddPetScreen")}>
        <Feather name="plus" size={32} color="#A0AEC0" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarSection: { flexDirection: "row", alignItems: "center", gap: 16, marginHorizontal: 16, marginVertical: 10,},
  avatarWrapper: { alignItems: "center" },
  avatarCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: "#5A7863", justifyContent: "center", alignItems: "center", padding: 3, marginBottom: 8 },
  avatarInner: { width: "100%", height: "100%", borderRadius: 42, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" },
  avatarLabel: { fontSize: 15, color: "#2D3748", fontWeight: "500" },
  addPetButton: { width: 90, height: 90, borderRadius: 45, borderWidth: 2, borderColor: "#CBD5E0", borderStyle: "dashed", justifyContent: "center", alignItems: "center" },
});
