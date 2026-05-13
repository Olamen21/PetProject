import { Colors } from "@/app/constants/Colors";
import CommonTextInput from "@/app/shared/components/CommonTextInput";
import { StyleSheet, Text, View } from "react-native";
import { Pet } from "../../../shared/types/Pet";
import { VaccineCategory } from "../types/VaccineCategory";
import CommonSelector from "@/app/shared/components/CommonSelector";
import { useState } from "react";
import CommonSelectModal from "@/app/shared/components/CommonSelectModal";
import { Vaccine } from "../types/Vaccine";

interface VaccineInfoCardProps {
  vaccine: Vaccine | null;
  setVaccine: (value: Vaccine) => void;
  vaccineCategory: VaccineCategory[];
}
export default function VaccineInfoCard({
  vaccine,
  setVaccine,
  vaccineCategory,
}: VaccineInfoCardProps) {
  const [showVaccineModal, setShowVaccineModal] = useState(false);
  const [selectedVaccineCategory, setSelectedVaccineCategory] =
    useState<VaccineCategory | null>(null);
  const [doseNumber, setDoseNumber] = useState(""); 

  const handleSelectVaccine = (name: string) => {
    const found = vaccineCategory.find((v) => v.name === name);
    setSelectedVaccineCategory(found || null);
    setShowVaccineModal(false);
    const num = doseNumber ? Number(doseNumber) : undefined;
    setVaccine({
      ...vaccine,
      category_id: found?.id,
      dose_number: num,
    });
  };

  const handleDoseChange = (text: string) => {
    const num = text ? Number(text) : undefined;
    setDoseNumber(text);
    setVaccine({
      ...vaccine,
      category_id: selectedVaccineCategory?.id,
      dose_number: num,
    });
  };

  return (
    <View>
      <View style={styles.row}>
        <View style={[styles.input, styles.vaccineInput]}>
          <Text style={styles.label}>{"Vaccine Name *"}</Text>
          <CommonSelector
            value={selectedVaccineCategory?.name || ""}
            placeholder="Select vaccine"
            onPress={() => setShowVaccineModal(true)}
          />
          <CommonSelectModal
            visible={showVaccineModal}
            onClose={() => setShowVaccineModal(false)}
            options={vaccineCategory.map((v) => v.name)}
            selected={selectedVaccineCategory?.name || ""}
            onSelect={handleSelectVaccine}
          />
        </View>

        <View style={[styles.input, styles.numberInput]}>
          <Text style={styles.label}>{"Number *"}</Text>
          <CommonTextInput
            placeholder="4"
            value={doseNumber}
            onChangeText={handleDoseChange}
            backgroundColor={Colors.white}
            bordered
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4A5568",
    marginTop: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
  },
  vaccineInput: {
    flex: 2,
  },
  numberInput: {
    flex: 1,
  },
});
