import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CommonButton from "../../../shared/components/CommonButton";
import CommonSelector from "@/app/shared/components/CommonSelector";
import CommonSelectModal from "@/app/shared/components/CommonSelectModal";
import CommonMessage from "@/app/shared/components/CommonMessage";
import StepHeader from "../components/StepHeader";

export default function SelectGenderScreen() {
  const { petName, petType, breed } = useLocalSearchParams<{ 
      petName: string,
      petType: string,
      breed: string 
  }>();
  const router = useRouter();

  const [gender, setGender] = useState("");
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const genders = ["Male", "Female"];

  const isFormComplete = gender.trim() !== "" && petType !== null;

  const handleContinue = () => {
    if (isFormComplete) {
      router.replace({
        pathname: "/(tabs)/SelectBirthdayScreen",
        params: { 
          petName,
          petType,
          breed, 
          gender 
        },
      });
    } else {
      setShowError(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <StepHeader
          onBack={() => router.replace("/(tabs)/SelectBreedScreen")}
          totalSteps={4}
          currentStep={2}
        />

        <View style={styles.header}>
          <Ionicons name="paw" size={28} color="#5A7863" />
          <Text style={styles.title}>Is Sun a girl or a boy?</Text>
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
        <Text style={styles.label}>Select gender</Text>
        <CommonSelector
          value={gender}
          placeholder="Enter your pet's gender"
          onPress={() => setShowGenderModal(true)}
        />

        <CommonSelectModal
          visible={showGenderModal}
          onClose={() => setShowGenderModal(false)}
          options={genders}
          selected={gender}
          onSelect={setGender}
          title="Select gender"
        />
        {showError && (
          <CommonMessage
            type="error"
            message="Please select a gender before continue"
          />
        )}
      </View>

      <CommonButton
        title="Continue"
        onPress={handleContinue}
        backgroundColor={gender ? "#5A7863" : "#EBF4DD"}
        textColor={gender ? "#fff" : "#000"}
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
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2D3E50",
    marginBottom: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#5A7863",
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
