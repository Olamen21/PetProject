import { Colors } from "@/app/constants/Colors";
import { Image, StyleSheet, Text, View } from "react-native";
import { InfoRow } from "./InfoRow";
import { Pet } from "../../../shared/types/Pet";
import type { Breed } from "../types/Breed";
import PetAvatar from "../../home/components/PetAvatar";
interface BasicInfoCardProps {
  pet: Pet | null;
  setPet: (value: Pet) => void;
  breeds: Breed[];
}
export default function BasicInfoCard({
  pet,
  setPet,
  breeds,
}: BasicInfoCardProps) {
  const breedName =
    breeds.find((b) => b.id === pet?.breed_id)?.name ?? "Unknown";
  const calculateAge = (dob: string | Date): number => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <View style={styles.card}>
      <View style={styles.column}>
        {/* <Image source={{ uri: pet?.avatar_url ?? "" }} style={styles.image} /> */}
        <PetAvatar
          name={pet?.name ?? "Unknown"}
          avatarUri={pet?.avatar_url}
          species={pet?.species}
        />
        {/* <Text style={styles.name}>{pet?.name}</Text> */}
      </View>

      {/* Thông tin */}
      <View style={styles.infoSection}>
        <View style={styles.row}>
          <InfoRow icon="paw-outline" label={breedName} />
          <InfoRow
            icon="calendar-outline"
            label={
              pet?.date_of_birth
                ? `${calculateAge(pet.date_of_birth)} years old`
                : "Unknown"
            }
          />
        </View>

        <View style={styles.row}>
          <InfoRow icon="male-outline" label={pet?.gender ?? ""} />
          <InfoRow
            icon="scale-outline"
            label={pet?.weight ? `${pet.weight} kg` : "Unknown"}
          />
          <InfoRow
            icon="resize-outline"
            label={pet?.height ? `${pet.height} cm` : "Unknown"}
          />
        </View>

        <View style={styles.vaccinRow}>
          <Text style={styles.text}>Vaccination: Up-to-date  </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    margin: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 64,
    height: 84,
    borderRadius: 60,
  },
  infoSection: {
    flexDirection: "column",
    justifyContent: "center",
  },
  name: {
    fontSize: 12,
    marginBottom: 6,
    color: Colors.primary,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  column: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 2,
    gap: 5,
    marginRight: 12,
  },
  text: {
    marginLeft: 6,
    fontSize: 10,
    color: Colors.text,
  },
  vaccinRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 64,
    backgroundColor: Colors.background,
    marginRight: 5,
    marginTop: 5,
  },
});
