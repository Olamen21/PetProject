import { Colors } from "@/app/constants/Colors";
import HeaderBar from "@/app/shared/components/HeaderBar";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BasicInfoCard from "../components/BasicInfoCard";
import { useCallback, useState } from "react";
import { Pet } from "@/app/shared/types/Pet";
import { Breed } from "../types/Breed";
import {
  getAllBreed,
  getPetById,
  getPrescriptionDisplayItem,
} from "../services/vetService";
import { Ionicons } from "@expo/vector-icons";
import { MedicalButton } from "../components/MedicalButton";
import MedicalItem from "../components/MedicalItem";
import { PrescriptionDisplayItem } from "../types/Prescriptions";

export default function PrescriptionPage() {
  const router = useRouter();
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const { petId } = useLocalSearchParams<{ petId: string }>();
  const [selected, setSelected] = useState<string>("Prescriptions");
  const [prescriptions, setPrescriptions] = useState<PrescriptionDisplayItem[]>(
    [],
  );

  useFocusEffect(
    useCallback(() => {
      const fetchPetProfile = async () => {
        try {
          console.log("petId: " + petId);
          if (!petId) return;
          const dataPet = await getPetById(petId);
          setSelectedPet(dataPet);
          const breeds = await getAllBreed();
          setBreeds(breeds);
          const prescriptionDisplayItem =
            await getPrescriptionDisplayItem(petId);
          setPrescriptions(prescriptionDisplayItem);
        } catch (error) {
          console.error("Không thể tải pet:", error);
        }
      };
      fetchPetProfile();
    }, []),
  );

  return (
    <View style={styles.container}>
      <HeaderBar
        title="Prescriptions"
        leftIcons={[
          {
            type: "ion",
            name: "chevron-back-outline",
            onPress: () => router.push("/(tabs)/VetPage"),
          },
        ]}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <BasicInfoCard
          pet={selectedPet}
          setPet={setSelectedPet}
          breeds={breeds}
        />

        {/* Medical record */}
        <View style={styles.reminderCardHeader}>
          <Text style={styles.textReminder}>Medical records</Text>
          <TouchableOpacity
            style={styles.buttonAdd}
            onPress={() => {
              if (selected === "Vaccination") {
                router.push({
                  pathname: "/(tabs)/AddVaccinationPage",
                  params: { petId: selectedPet?.id },
                });
              }
            }}
          >
            <Ionicons name="add-outline" color={Colors.white} size={24} />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <MedicalButton
            icon="medkit-outline"
            label="Vaccination"
            selected={selected === "Vaccination"}
            onPress={() => setSelected("Vaccination")}
          />
          <MedicalButton
            icon="clipboard-outline"
            label="Prescriptions"
            selected={selected === "Prescriptions"}
            onPress={() => setSelected("Prescriptions")}
          />
          <MedicalButton
            icon="chatbox-outline"
            label="Consultations"
            selected={selected === "Consultations"}
            onPress={() => setSelected("Consultations")}
          />
        </View>

        <View style={styles.cardHeader}>
          <Text style={styles.textCard}>Current medications</Text>
          <TouchableOpacity style={styles.buttonViewAll}>
            <Text style={styles.textViewAll}>View all</Text>
            <Ionicons
              name="chevron-forward-outline"
              color={Colors.primary}
              size={20}
            />
          </TouchableOpacity>
        </View>

        {prescriptions.map((item) => (
          <MedicalItem
            key={item.id}
            name={item.medication_name}
            dose={item.dosage}
            type={
              item.medication_name.toLowerCase().includes("dose") ||
              item.medication_name.toLowerCase().includes("rabies")
                ? "injection"
                : "pill"
            }
            status={item.status.toLowerCase() as "active" | "expired"}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    marginBottom: 50,
  },
  reminderCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 20,
  },
  textReminder: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
  },
  buttonAdd: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: Colors.primary,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 20,
  },
  textCard: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
  },
  buttonViewAll: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  textViewAll: {
    color: Colors.primary,
    fontWeight: "500",
    fontSize: 12,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
});
