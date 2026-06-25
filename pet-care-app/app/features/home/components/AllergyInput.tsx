import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/Colors";
import CommonButton from "../../../shared/components/CommonButton";
import { Pet } from "@/app/shared/types/Pet";

type Props = {
  pet: any;
  setPet: React.Dispatch<React.SetStateAction<any>>;
};

export default function AllergyInput({ pet, setPet }: Props) {
  const [currentAllergy, setCurrentAllergy] = useState("");

  const addAllergy = () => {
    if (currentAllergy.trim() !== "") {
      setPet((prev:Pet) => ({
        ...prev,
        allergies: [...(prev.allergies ?? []), currentAllergy.trim()],
      }));
      setCurrentAllergy("");
    }
  };

const removeAllergy = (index: number) => {
  setPet((prev:Pet) => {
    const allergiesArray = Array.isArray(prev.allergies)
      ? prev.allergies
      : (prev.allergies ?? "").split(",").map(a => a.trim());

    return {
      ...prev,
      allergies: allergiesArray.filter((_, i) => i !== index),
    };
  });
};


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Allergies</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Enter any allergies your pet has"
          value={currentAllergy}
          onChangeText={setCurrentAllergy}
        />
        <CommonButton
          onPress={addAllergy}
          iconName="add"
          title=""
          backgroundColor={Colors.primary}
          style={styles.addButton}
        />
      </View>

      <FlatList
  data={
    Array.isArray(pet.allergies)
      ? pet.allergies
      : (pet.allergies ?? "").split(",").map(a => a.trim())
  }
  keyExtractor={(item, index) => index.toString()}
  horizontal
  renderItem={({ item, index }) => (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{item}</Text>
      <TouchableOpacity onPress={() => removeAllergy(index)}>
        <Ionicons name="close" size={16} color={Colors.white} />
      </TouchableOpacity>
    </View>
  )}
/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  addButton: { marginLeft: 8, borderRadius: 8, height: 48 },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    gap: 6,
    marginTop:10,
  },
  tagText: { color: Colors.white, fontWeight: "500" },
});
