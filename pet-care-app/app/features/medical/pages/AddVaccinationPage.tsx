import HeaderBar from "@/app/shared/components/HeaderBar";
import { router, useFocusEffect } from "expo-router";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import BasicInfoCard from "../components/BasicInfoCard";
import { Colors } from "@/app/constants/Colors";
import { useState, useCallback } from "react";
import VaccineInfoCard from "../components/VaccineInfoCard";
import SelectDateVaccine from "../../vets/components/SelectDateVaccine";
import CommonButton from "@/app/shared/components/CommonButton";
import { useLocalSearchParams } from "expo-router";
import { Pet } from "@/app/shared/types/Pet";
import {
  getPetById,
  getAllBreed,
  getAllVaccineCategory,
  createVaccine,
} from "../services/MedicalService";
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
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchPetProfile = async () => {
        try {
          if (!petId) return;

          const dataPet = await getPetById(petId);
          setSelectedPet(dataPet);

          const allVaccines = await getAllVaccineCategory();

          const filteredVaccines = allVaccines.filter(
            (v: any) => v.target_species === dataPet.species,
          );

          setVaccineCategory(filteredVaccines);

          const breeds = await getAllBreed();
          setBreeds(breeds);
        } catch (error) {
          console.error("Không thể tải dữ liệu:", error);
        }
      };
      fetchPetProfile();
    }, [petId]),
  );
 const handleSubmit = async () => {
  if (!petId || !vaccine?.category_id || !scheduledDate || !vaccine?.dose_number) {
    alert("Vui lòng điền đầy đủ các thông tin bắt buộc!");
    return;
  }
  
  if (scheduledDate < new Date()) {
    alert("Ngày tiêm phải là ngày hiện tại hoặc tương lai!");
    return;
  }

  try {
    const payload = {
      pet_id: Number(petId),
      vaccine_id: Number(vaccine.category_id),
      dose_number: Number(vaccine.dose_number),
      dose_type: vaccine.dose_type || "PRIMARY", 
      scheduled_date: scheduledDate instanceof Date ? scheduledDate.toISOString() : scheduledDate,
      note: description || ""
    };

    console.log("Đang gửi dữ liệu JSON lên server:", payload);
    
    await createVaccine(payload);

    alert("Tạo lịch tiêm thành công!");
    router.push("/(tabs)/VaccinationPage");
  } catch (error: any) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      // Hứng trọn vẹn câu thông báo lỗi tùy biến thông minh từ NestJS truyền về
      alert(error.response.data.message);
    } else {
      alert("Có lỗi kết nối xảy ra, vui lòng thử lại sau!");
    }
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
          selectedDate={scheduledDate || new Date()}
          onDateChange={(date) => setScheduledDate(date)}
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
    marginBottom: 10,
  },
  descripSection: {
    marginHorizontal: 10,
    marginBottom: 10,
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
