import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CommonButton from "../../../shared/components/CommonButton";
import CommonMessage from "@/app/shared/components/CommonMessage";
import StepHeader from "../components/StepHeader";
import CommonTextInput from "@/app/shared/components/CommonTextInput";

export default function AddPetScreen() {
  const router = useRouter();
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState<"dog" | "cat" | null>(null);
  const [showError, setShowError] = useState(false);

  const isFormComplete = petName.trim() !== "" && petType !== null;

  const handleContinue = () => {
    if (isFormComplete) {
      router.replace({
        pathname: "/(tabs)/SelectBreedScreen",
        params: { petType },
      });
    } else {
      setShowError(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <StepHeader
          onBack={() => router.replace("/(tabs)/PetProfileScreen")}
          totalSteps={4}
          currentStep={0}
        />

        <View style={styles.header}>
          <Ionicons name="paw" size={28} color="#5A7863" />
          <Text style={styles.title}>Name your pet!</Text>
        </View>

        <Image
          source={require("../../../../assets/images/pet_split.png")}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.label}>Pet name</Text>
        <CommonTextInput
          placeholder="Enter your pet name"
          value={petName}
          onChangeText={setPetName}
          backgroundColor="#fff"
        />



        <Text style={styles.label}>Pick your Pet type</Text>
        <View style={styles.typeRow}>
          <TouchableOpacity
            style={[
              styles.typeCircle,
              petType === "dog" && styles.typeSelected,
            ]}
            onPress={() => setPetType("dog")}
          >
            <Image
              source={require("../../../../assets/images/dog_icon.png")}
              style={styles.imageIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeCircle,
              petType === "cat" && styles.typeSelected,
            ]}
            onPress={() => setPetType("cat")}
          >
            <Image
              source={require("../../../../assets/images/cat_icon.png")}
              style={styles.imageIcon}
            />
          </TouchableOpacity>
        </View>
        {showError && (
          <CommonMessage
            type="error"
            message="Please enter pet name and select pet type before continue"
          />
        )}
      </View>

      <CommonButton
        title="Continue"
        onPress={handleContinue}
        backgroundColor={isFormComplete ? "#5A7863" : "#EBF4DD"}
        textColor={isFormComplete ? "#fff" : "#000"}
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
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2D3E50",
    marginBottom: 8,
  },
  typeRow: {
    flexDirection: "row",
    marginBottom: 32,
  },
  typeCircle: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#D0D5DD",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  typeSelected: {
    borderColor: "#5A7863",
    backgroundColor: "#EBF4DD",
  },
  imageIcon: {
    width: 80,
    height: 60,
  },
  button: {
    borderRadius: 12,
    height: 55,
  },
});
