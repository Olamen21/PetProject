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
  getAllVets,
  getMedicalRecordByPetID,
  getPetById,
} from "../services/vetService";
import { Ionicons } from "@expo/vector-icons";
import { MedicalButton } from "../components/MedicalButton";
import DocumentItem from "../components/DocumentItem";
import { MedicalRecord } from "../types/Prescriptions";

const formatDate = (isoString: string) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-GB", options);
};

export default function DocumentPage() {
  const router = useRouter();
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const { petId } = useLocalSearchParams<{ petId: string }>();
  const [selected, setSelected] = useState<string>("Documents");
  const [documents, setDocuments] = useState<MedicalRecord[]>([]);

  const handleView = (item: MedicalRecord) => {
    router.push({
      pathname: "/(tabs)/DocumentDetailPage",
      params: {
        id: item.id.toString(),
        title: item.title,
        date: formatDate(item.created_at),
        vetName: item.vet_name,
        diagnosis: item.diagnosis,
        weight: item.weight_at_exam?.toString() || "",
        symptoms: item.symptoms,
        notes: item.vet_notes || "",
        prescriptionsData: JSON.stringify(item.prescriptions || []),
      },
    });
  };

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
          const vetData = await getAllVets();
          const records = await getMedicalRecordByPetID(petId);

          const enrichedRecords: MedicalRecord[] = records.map(
            (record: MedicalRecord) => {
              const vet = vetData.find((v: any) => v.id === record.vet_id);
              return {
                ...record,
                vet_name: vet ? vet.full_name : undefined,
              };
            },
          );

          setDocuments(enrichedRecords);
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
        title="Documents"
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
            icon="document-text-outline"
            label="Documents"
            selected={selected === "Documents"}
            onPress={() => setSelected("Documents")}
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

        {documents.map((item) => (
          <DocumentItem
            key={item.id}
            date={formatDate(item.created_at)}
            title={item.title}
            subtitle={item.vet_name}
            onViewPress={() => handleView(item)}
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
