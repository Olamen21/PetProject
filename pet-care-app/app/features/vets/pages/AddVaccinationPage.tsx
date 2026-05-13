import HeaderBar from "@/app/shared/components/HeaderBar";
import { router, useFocusEffect } from "expo-router";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import BasicInfoCard from "../components/BasicInfoCard";
import { Colors } from "@/app/constants/Colors";
import { useState, useCallback } from "react";
import CommonToggle from "@/app/shared/components/CommonToggle";
import FrequencyCard from "../components/FrequencyCard";
import VaccineInfoCard from "../components/VaccineInfoCard";
import SelectDateVaccine from "../components/SelectDateVaccine";
import CommonButton from "@/app/shared/components/CommonButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pet } from "@/app/shared/types/Pet";
import {
  getPetById,
  getAllBreed,
  getAllVaccineCategory,
  createVaccine,
} from "../services/vetService";
import type { Breed } from "../types/Breed";
import type { VaccineCategory } from "../types/VaccineCategory";
import type { Vaccine } from "../types/Vaccine";

export default function AddVaccinationPage() {
  const [description, setDescription] = useState("");
  const { petId } = useLocalSearchParams<{ petId: string }>();
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [vaccineCategory, setVaccineCategory] = useState<VaccineCategory[]>([]);
  const [vaccine, setVaccine] = useState<Vaccine | null>(null);
  const [scheduledDate, setScheduledDate] = useState<Date>(new Date());

  useFocusEffect(
    useCallback(() => {
      const fetchPetProfile = async () => {
        try {
          if (!petId) return;

          const dataPet = await getPetById(petId);
          setSelectedPet(dataPet);

          const allVaccines = await getAllVaccineCategory();

          const filteredVaccines = allVaccines.filter(
            (v) => v.target_species === dataPet.species,
          );

          setVaccineCategory(filteredVaccines);

          const breeds = await getAllBreed();
          setBreeds(breeds);
        } catch (error) {
          console.error("Không thể tải dữ liệu:", error);
        }
      };
      fetchPetProfile();
    }, []),
  );
  const handleSubmit = async () => {
  if (!petId || !vaccine?.category_id || !scheduledDate) {
    alert("Vui lòng điền đầy đủ các thông tin bắt buộc!");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("pet_id", String(petId)); 
    formData.append("vaccine_id", String(vaccine.category_id)); 
    formData.append("dose_number", String(vaccine.dose_number))
    formData.append("scheduled_date", scheduledDate instanceof Date ? scheduledDate.toISOString() : scheduledDate);
    formData.append("note", description || ""); 

    console.log("Đang gửi dữ liệu...");
    await createVaccine(formData);
    
    alert("Tạo lịch tiêm thành công!");
  } catch (error) {
    console.error("Lỗi tạo vaccine:", error);
    alert("Có lỗi xảy ra, vui lòng thử lại sau.");
  }
};

  return (
    <View style={styles.container}>
      <HeaderBar
        title="Add a Vaccine"
        leftIcons={[
          {
            type: "ion",
            name: "chevron-back-outline",
            onPress: () => router.push("/(tabs)/VaccinationPage"),
          },
        ]}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <BasicInfoCard
          pet={selectedPet}
          setPet={setSelectedPet}
          breeds={breeds}
        />
        <VaccineInfoCard
          vaccine={vaccine}
          setVaccine={setVaccine}
          vaccineCategory={vaccineCategory}
        />

        {/* Select Date of each Vaccine */}
        <View style={styles.reminderCardHeader}>
          <Text style={styles.textReminder}>Select Date of each Vaccine</Text>
        </View>
        <SelectDateVaccine
          selectedDate={scheduledDate}
          onDateChange={(newDate) => setScheduledDate(newDate)}
        />

        <CommonToggle
          label="Add to reminder"
          initialValue={true}
          onToggle={(value) => console.log("Toggle changed:", value)}
        />

        {/* Description */}
        <View style={styles.descripSection}>
          <View style={{ ...styles.reminderCardHeader, marginBottom: 10 }}>
            <Text style={styles.textReminder}>Description</Text>
          </View>
          <TextInput
            style={styles.textArea}
            placeholder="Don't forget to buy a new transportation box in petshop next to the clinic"
            value={description}
            onChangeText={setDescription}
            multiline={true}
            numberOfLines={4}
          />
        </View>

        {/* Frequency */}
        <View style={{ ...styles.reminderCardHeader, marginBottom: 10 }}>
          <Text style={styles.textReminder}>Frequency</Text>
        </View>
        <FrequencyCard />

        {/* Toggle */}
        <CommonToggle
          iconName="calendar-outline"
          label="Time interval"
          initialValue={true}
          onToggle={(value) => console.log("Toggle changed:", value)}
        />

        <CommonToggle
          iconName="pin-outline"
          label="Pin to top"
          initialValue={true}
          onToggle={(value) => console.log("Toggle changed:", value)}
        />

        <CommonToggle
          iconName="notifications-outline"
          label="Notification"
          initialValue={true}
          onToggle={(value) => console.log("Toggle changed:", value)}
        />

        <CommonButton
          title="Save"
          onPress={handleSubmit}
          style={{ margin: 10 }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingBottom: 50,
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
  descripSection: {
    marginHorizontal: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
    fontSize: 14,
    minHeight: 100,
    backgroundColor: Colors.white,
  },
});
