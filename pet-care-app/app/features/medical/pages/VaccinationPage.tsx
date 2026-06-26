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
import React, { useCallback, useState } from "react";
import { ReminderCard } from "@/app/shared/components/ReminderCard";
import { VaccinationScheduleCard } from "../components/VaccinationScheduleCard";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  getPetById,
  getAllBreed,
  getVaccineByPetId,
  getAllVaccineCategory,
} from "../services/MedicalService";
import { Pet } from "@/app/shared/types/Pet";
import type { Breed } from "../types/Breed";
import { VaccineCategory } from "../types/VaccineCategory";

export default function Vaccination() {
  const [selected, setSelected] = useState<string>("Vaccination");
  const { petId } = useLocalSearchParams<{ petId: string }>();
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [vaccinationSchedule, setVaccinationSchedule] = useState<any>(null);
  const [vaccineCategory, setVaccineCategory] = useState<VaccineCategory[]>([]);
  useFocusEffect(
    React.useCallback(() => {
      const fetchPetProfile = async () => {
        try {
          console.log("petId: " + petId);
          if (!petId) return;
          const dataPet = await getPetById(petId);
          setSelectedPet(dataPet);
          const breeds = await getAllBreed();
          setBreeds(breeds);
          const vaccinationSchedule = await getVaccineByPetId(petId);
          setVaccinationSchedule(vaccinationSchedule);
          console.log("vaccinationSchedule: ", vaccinationSchedule);

          const vaccineCategory = await getAllVaccineCategory();
          const fileteredVaccines = vaccineCategory.filter(
            (v: VaccineCategory) => v.target_species === dataPet.species,
          );
          setVaccineCategory(fileteredVaccines);
        } catch (error) {
          console.error("Không thể tải pet:", error);
        }
      };
      fetchPetProfile();
    }, [petId]),
  );
  const renderScheduleCards = () => {
    const historyList = vaccinationSchedule || [];

    return vaccineCategory.map((category) => {
      const history = historyList.filter(
        (pv: any) => pv.vaccine_id === category.id,
      );

      const upcomingDose = history
        .filter((pv: any) => pv.status === "PENDING" && pv.scheduled_date)
        .sort(
          (a: any, b: any) =>
            new Date(a.scheduled_date).getTime() -
            new Date(b.scheduled_date).getTime(),
        )[0];

      let nextDoseStr = "No upcoming dose";
      if (upcomingDose) {
        const d = new Date(upcomingDose.scheduled_date);
        nextDoseStr =
          d.toLocaleDateString("en-US", { month: "short", day: "numeric" }) +
          `, ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
      }

      const dosesList: any[] = [];

      for (let i = 1; i <= category.max_doses; i++) {
        const record = history.find(
          (pv: any) => pv.dose_number === i && pv.dose_type === "PRIMARY",
        );

        if (record) {
          const hasAdministered = !!record.administered_date;
          const targetDate = hasAdministered
            ? record.administered_date
            : record.scheduled_date;

          dosesList.push({
            label: `Dose ${i}:`,
            date: targetDate
              ? new Date(targetDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "N/A",
            status: hasAdministered ? "done" : "upcoming",
          });
        } else {
          dosesList.push({
            label: `Dose ${i}:`,
            date: "Not scheduled yet",
            status: "upcoming",
          });
        }
      }

      const boosterRecords = history.filter(
        (pv: any) => pv.dose_type === "BOOSTER",
      );

      boosterRecords.forEach((record: any, index: number) => {
        const hasAdministered = !!record.administered_date;
        const targetDate = hasAdministered
          ? record.administered_date
          : record.scheduled_date;

        dosesList.push({
          label: `Booster ${index + 1}:`,
          date: targetDate
            ? new Date(targetDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "N/A",
          status: hasAdministered ? "done" : "upcoming",
        });
      });

      return (
        <VaccinationScheduleCard
          key={category.id}
          title={category.name}
          subtitle={category.max_doses === 1 ? "Single dose" : "Primary course"}
          nextDose={nextDoseStr}
          doses={dosesList}
          onChangeSchedule={() =>
            console.log("Change schedule pressed for", category.name)
          }
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <HeaderBar
        title="Vaccination"
        leftIcons={[
          {
            type: "ion",
            name: "chevron-back-outline",
            onPress: () => router.push("/(tabs)/MedicalRecordPage"),
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
          <Text style={styles.textReminder}>Vaccination</Text>
          <TouchableOpacity
            style={styles.buttonAdd}
            onPress={() => {
              router.push({
                pathname: "/(tabs)/AddVaccinationPage",
                params: { petId: selectedPet?.id },
              });
            }}
          >
            <Ionicons name="add-outline" color={Colors.white} size={24} />
          </TouchableOpacity>
        </View>

        {/* Upcoming vaccine*/}
        <View style={styles.reminderCardHeader}>
          <Text style={styles.textReminder}>Upcoming Vaccine</Text>
        </View>
        {vaccinationSchedule
          ?.filter((item: any) => item.status === "PENDING") 
          ?.map((item: any) => (
            <ReminderCard
              key={item.id}
              petName={selectedPet?.name ?? "Unknown"}
              treatment={item.vaccine?.name}
              dose={`Dose ${item.dose_number}`}
              time={
                item.scheduled_date
                  ? new Date(item.scheduled_date).toLocaleDateString("en-US")
                  : "N/A"
              }
              task="Vaccine"
              showCheckbox={false}
            />
          ))}

        {/* All vaccine */}
        <View style={styles.reminderCardHeader}>
          <Text style={styles.textReminder}>All Vaccine</Text>
        </View>
        {renderScheduleCards()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
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
