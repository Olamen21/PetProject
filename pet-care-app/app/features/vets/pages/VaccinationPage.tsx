import HeaderBar from "@/app/shared/components/HeaderBar";
import { router, useFocusEffect } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BasicInfoCard from "../components/BasicInfoCard";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/app/constants/Colors";
import { MedicalButton } from "../components/MedicalButton";
import { useCallback, useState } from "react";
import { ReminderCard } from "@/app/shared/components/ReminderCard";
import { VaccinationScheduleCard } from "../components/VaccinationScheduleCard";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getPetById, getAllBreed } from "../services/vetService";
import { Pet } from "@/app/shared/types/Pet";
import type { Breed } from "../types/Breed";

export default function Vaccination() {
  const [selected, setSelected] = useState<string>("Vaccination");
  const { petId } = useLocalSearchParams<{ petId: string }>();
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [breeds, setBreeds] = useState<Breed[]>([]);

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
        title="Vaccination"
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

        {/* Upcoming vaccine*/}
        <View style={styles.reminderCardHeader}>
          <Text style={styles.textReminder}>Upcoming Vaccine</Text>
        </View>
        <ReminderCard
          petName="Tommy"
          treatment="Rabies 1ml"
          dose="1 dose"
          time="9:00"
          task="Meal"
        />

        {/* Ongoing vaccine */}
        <View style={styles.reminderCardHeader}>
          <Text style={styles.textReminder}>Ongoing Vaccine</Text>
        </View>
        <VaccinationScheduleCard
          title="Rabies 1ml"
          subtitle="Primary course"
          nextDose="Sep 28, 6:00"
          doses={[
            { label: "Dose 1:", date: "Aug 15, 2025", status: "done" },
            { label: "Dose 2:", date: "Sep 15, 2025", status: "done" },
            {
              label: "Dose 3:",
              date: "Oct 15, 2025",
              time: "6:00",
              status: "upcoming",
            },
          ]}
          onChangeSchedule={() => console.log("Change schedule pressed")}
        />

        {/* Parvovirus Vaccines */}
        <View style={styles.reminderCardHeader}>
          <Text style={styles.textReminder}>Parvovirus Vaccines</Text>
        </View>
        <VaccinationScheduleCard
          title="Rabies 1ml"
          subtitle="All doses are completed"
          doses={[
            { label: "Dose 1:", date: "Aug 15, 2025", status: "done" },
            { label: "Dose 2:", date: "Sep 15, 2025", status: "done" },
            {
              label: "Dose 3:",
              date: "Oct 15, 2025",
              time: "6:00",
              status: "done",
            },
          ]}
          onChangeSchedule={() => console.log("Change schedule pressed")}
        />
        <VaccinationScheduleCard
          title="Rabies 1ml"
          subtitle="All doses are completed"
          doses={[
            { label: "Dose 1:", date: "Aug 15, 2025", status: "done" },
            { label: "Dose 2:", date: "Sep 15, 2025", status: "done" },
            {
              label: "Dose 3:",
              date: "Oct 15, 2025",
              time: "6:00",
              status: "done",
            },
          ]}
          onChangeSchedule={() => console.log("Change schedule pressed")}
        />
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
    color: "#3B4953",
  },
  buttonAdd: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: Colors.primary,
  },
});
