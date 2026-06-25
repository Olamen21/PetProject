import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CommonButton from "../../../shared/components/CommonButton";
import CommonSelector from "@/app/shared/components/CommonSelector";
import CommonMessage from "@/app/shared/components/CommonMessage";
import DateTimePicker from "@react-native-community/datetimepicker";
import StepHeader from "../components/StepHeader";
import { createPet } from "../services/createPetService";
import { Colors } from "@/app/constants/Colors";

export default function SelectBirthdayScreen() {
  const { petName, petType, breedId, gender } = useLocalSearchParams<{ 
        petName: string,
        petType: string,
        breedId: string,
        gender: string, 
    }>();
  const router = useRouter();

  const [birthday, setBirthday] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleCreatePet = async () => {
    try {
       await createPet({
        name: petName,
        species: petType,
        breed_id: Number(breedId),
        gender: gender as "Male" | "Female",
        weight: 0,
        date_of_birth: birthday ? birthday.toISOString().split("T")[0] : "",
      });

      router.replace("/(tabs)/HomeScreen");
    } catch (error) {
      console.error("Không thể tạo pet:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <StepHeader
          onBack={() => router.replace("/(tabs)/SelectGenderScreen")}
          totalSteps={4}
          currentStep={3}
        />

        <View style={styles.header}>
          <Ionicons name="paw" size={28} color= {Colors.primary} />
          <Text style={styles.title}>{"When is your pet's birthday?"}</Text>
        </View>

        {petType === "dog" ? (
          <Image
            source={require("../../../../assets/images/dog_bg.png")}
            style={styles.image}
          />
        ) : (
          <Image
            source={require("../../../../assets/images/cat_bg.png")}
            style={styles.image}
          />
        )}
        <Text style={styles.label}>Select birthday</Text>
        <CommonSelector
          value={birthday ? birthday.toDateString() : ""}
          placeholder="Enter your pet's birthday"
          onPress={() => setShowPicker(true)}
        />

        {showPicker && (
          <DateTimePicker
            value={birthday || new Date()}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowPicker(false);
              if (date) setBirthday(date);
            }}
          />
        )}

        {showError && (
          <CommonMessage
            type="error"
            message="Please select a birthday before continue"
          />
        )}
      </View>

      <CommonButton
        title="Continue"
        onPress={handleCreatePet}
        backgroundColor={birthday ? Colors.primary : "#EBF4DD"}
        textColor={birthday ? Colors.white : Colors.black}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 20,
  },
  content: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primary,
  },
  image: {
    marginLeft: -30,
    width: 400,
    height: 250,
    marginBottom: 20,
  },
  button: {
    borderRadius: 12,
    height: 55,
  },
});
