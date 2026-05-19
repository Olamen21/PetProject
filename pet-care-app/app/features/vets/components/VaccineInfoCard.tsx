import { Colors } from "@/app/constants/Colors";
import { StyleSheet, Text, View } from "react-native";
import { VaccineCategory } from "../types/VaccineCategory";
import CommonSelector from "@/app/shared/components/CommonSelector";
import { useState } from "react";
import CommonSelectModal from "@/app/shared/components/CommonSelectModal";
import { Vaccine } from "../types/Vaccine";

interface VaccineInfoCardProps {
  vaccine: Vaccine | null;
  setVaccine: (value: any) => void; 
  vaccineCategory: VaccineCategory[];
}

export default function VaccineInfoCard({
  vaccine,
  setVaccine,
  vaccineCategory,
}: VaccineInfoCardProps) {
  const [showVaccineModal, setShowVaccineModal] = useState(false);
  const [showDoseModal, setShowDoseModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false); 

  const [selectedVaccineCategory, setSelectedVaccineCategory] =
    useState<VaccineCategory | null>(null);
  const [doseOptions, setDoseOptions] = useState<string[]>([]);

  const typeMapping = {
    PRIMARY: "Mũi cơ bản (1, 2, 3)",
    BOOSTER: "Mũi nhắc lại hàng năm",
  };

  const handleSelectVaccine = (name: string) => {
    const found = vaccineCategory.find((v) => v.name === name);
    setSelectedVaccineCategory(found || null);
    setShowVaccineModal(false);

    if (found) {
      setVaccine({
        ...vaccine,
        category_id: found.id,
        dose_number: found.max_doses === 1 ? 1 : undefined,
        dose_type: "PRIMARY", 
      });

      if (found.max_doses > 1) {
        const options = Array.from({ length: found.max_doses || 3 }, (_, i) => String(i + 1));
        setDoseOptions(options);
      }
    }
  };

  const handleSelectType = (label: string) => {
    setShowTypeModal(false);
    const selectedKey = Object.keys(typeMapping).find(
      (key) => typeMapping[key as keyof typeof typeMapping] === label
    ) as "PRIMARY" | "BOOSTER";

    if (selectedKey === "BOOSTER") {
      setVaccine({
        ...vaccine,
        category_id: selectedVaccineCategory?.id,
        dose_type: "BOOSTER",
        dose_number: 1, 
      });
    } else {
      setVaccine({
        ...vaccine,
        category_id: selectedVaccineCategory?.id,
        dose_type: "PRIMARY",
        dose_number: selectedVaccineCategory?.max_doses === 1 ? 1 : undefined,
      });
    }
  };

  const handleSelectDose = (dose: string) => {
    setShowDoseModal(false);
    setVaccine({
      ...vaccine,
      category_id: selectedVaccineCategory?.id,
      dose_number: Number(dose),
    });
  };

  const isDoseDisabled =
    !selectedVaccineCategory || 
    selectedVaccineCategory.max_doses === 1 || 
    vaccine?.dose_type === "BOOSTER";

  return (
    <View style={styles.container}>
      {/*  Ô Chọn Tên Vaccine */}
      <View style={styles.fullWidthInput}>
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

      <View style={styles.row}>
        {/* Ô Chọn Loại Mũi Tiêm (Dose Type) */}
        <View style={[styles.input, styles.typeInput]}>
          <Text style={styles.label}>{"Dose Type *"}</Text>
          <CommonSelector
            value={vaccine?.dose_type ? typeMapping[vaccine.dose_type as keyof typeof typeMapping] : ""}
            placeholder="Select Type"
            disabled={!selectedVaccineCategory}
            onPress={() => setShowTypeModal(true)}
          />
          <CommonSelectModal
            visible={showTypeModal}
            onClose={() => setShowTypeModal(false)}
            options={Object.values(typeMapping)}
            selected={vaccine?.dose_type ? typeMapping[vaccine.dose_type as keyof typeof typeMapping] : ""}
            onSelect={handleSelectType}
          />
        </View>

        {/* Ô Chọn Số Mũi (Number) */}
        <View style={[styles.input, styles.numberInput]}>
          <Text style={styles.label}>{"Number *"}</Text>
          <CommonSelector
            value={vaccine?.dose_number ? String(vaccine.dose_number) : ""}
            placeholder={isDoseDisabled && selectedVaccineCategory ? "1" : "Select"}
            disabled={isDoseDisabled}
            onPress={() => setShowDoseModal(true)}
          />
          {selectedVaccineCategory && selectedVaccineCategory.max_doses > 1 && (
            <CommonSelectModal
              visible={showDoseModal}
              onClose={() => setShowDoseModal(false)}
              options={doseOptions}
              selected={vaccine?.dose_number ? String(vaccine.dose_number) : ""}
              onSelect={handleSelectDose}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4A5568",
    marginTop: 10,
    marginBottom: 10,
  },
  fullWidthInput: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  input: {
    flex: 1,
  },
  typeInput: {
    flex: 2,
  },
  numberInput: {
    flex: 1, 
  },
});