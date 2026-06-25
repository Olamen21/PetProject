import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Pet } from "@/app/shared/types/Pet";
import { MedicalRecord } from "../types/Prescriptions";
import { getMedicalRecordByPetID, getAllVets } from "../services/MedicalService";
import DocumentItem from "../components/DocumentItem"; 

const formatDate = (isoString: string) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function LastestRecordComponent({
  pets,
  selectedPet,
  onSelectPet,
}: {
  pets: Pet[];
  selectedPet: Pet | null;
  onSelectPet: (pet: Pet) => void;
}) {
  const [records, setRecords] = useState<MedicalRecord[]>([]);

  useEffect(() => {
    const fetchRecords = async () => {
      if (!selectedPet) return;
      try {
        const vetData = await getAllVets();
        const data = await getMedicalRecordByPetID(selectedPet.id.toString());
        const enriched = data.map((record: MedicalRecord) => {
          const vet = vetData.find((v: any) => v.id === record.vet_id);
          return { ...record, vet_name: vet ? vet.full_name : undefined };
        });
        setRecords(enriched);
      } catch (err) {
        console.error("Không thể tải records:", err);
      }
    };
    fetchRecords();
  }, [selectedPet]);

  return (
    <View>
      <View style={styles.reminderCardHeader}>
        <Text style={styles.textReminder}>Latest records</Text>
        <TouchableOpacity style={styles.buttonViewAll}>
          <Text style={styles.textViewAll}>View all</Text>
          <Ionicons name="chevron-forward-outline" color="#5A7863" size={20} />
        </TouchableOpacity>
      </View>

      {records.length === 0 ? (
        <>
          <View style={styles.icon}>
            <Ionicons name="calendar-number-outline" color="#5A7863" size={100} />
          </View>
          <Text style={styles.noRemindersText}>
            You don’t have any records yet. Add your pet’s latest health updates here!
          </Text>
        </>
      ) : (
        records.slice(0, 3).map((item) => (
          <DocumentItem
            key={item.id}
            date={formatDate(item.created_at)}
            title={item.title}
            subtitle={item.vet_name}
            onViewPress={() => console.log("View record", item.id)}
            showEye={false}
          />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  buttonViewAll: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  textViewAll: {
    color: "#5A7863",
    fontWeight: "500",
    fontSize: 12,
  },
  icon: {
    alignItems: "center",
    marginTop: 20,
  },
  noRemindersText: {
    textAlign: "center",
    color: "#3B4953",
    fontSize: 16,
    marginHorizontal: 40,
    marginTop: 10,
    fontWeight: "500",
    marginBottom: 20,
  },
});
