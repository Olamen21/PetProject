import { View, Text, StyleSheet } from "react-native";
import { Pet } from "../types/Pet";

interface InfoCardProps {
  pet : Pet
}

export default function InfoCards({ pet }: InfoCardProps) {
  return (
    <>
      <View style={styles.infoCardsRow}>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Breed</Text>
          <Text style={styles.infoValue}>{pet.breed}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Born On</Text>
          <Text style={styles.infoValue}>{pet.date_of_birth}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Gender</Text>
          <Text style={styles.infoValue}>{pet.gender}</Text>
        </View>
      </View>
      <View style={styles.reproCard}>
        <Text style={styles.infoLabel}>Repro Status</Text>
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
  infoValue: { fontSize: 15, color: "#2D3748", fontWeight: "600" },
});
