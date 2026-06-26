import { Pet } from "@/app/shared/types/Pet";
import { StyleSheet, Text, View } from "react-native";

interface InfoPetProps {
  pet : Pet;
}

export default function InfoPet({ pet }: InfoPetProps) {
    return (
        <>
          <View style={styles.infoCardsRow}>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Born On </Text>
              <Text style={styles.infoValue}>{pet.date_of_birth}</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Weight </Text>
              <Text style={styles.infoValue}>{pet.weight}</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Height </Text>
              <Text style={styles.infoValue}>{pet.height}</Text>
            </View>
          </View>
          <View style={styles.reproCard}>
            <Text style={styles.infoLabel}>Repro Status </Text>
            <Text style={styles.infoValue}>{pet.neutered ? "Neutered" : "None"}</Text>
          </View>
        </>
      );
}

const styles = StyleSheet.create({
  infoCardsRow: {
    flexDirection: "row",
    gap: 10,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingVertical: 16,
    alignItems: "center",
  },
  reproCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingVertical: 16,
    marginHorizontal: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  infoLabel: { fontSize: 12, color: "#A0AEC0", marginBottom: 6 },
  infoValue: { fontSize: 14, color: "#2D3748", fontWeight: "600" },
});
