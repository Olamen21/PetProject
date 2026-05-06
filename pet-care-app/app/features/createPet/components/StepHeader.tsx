import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import StepProgressBar from "./StepProgressBar";

type Props = {
  onBack: () => void;
  totalSteps: number;
  currentStep: number;
};

export default function StepHeader({ onBack, totalSteps, currentStep }: Props) {
  return (
    <View style={styles.headerRow}>
      <TouchableOpacity onPress={onBack}>
        <Ionicons name="chevron-back-outline" size={28} color="#5A7863" />
      </TouchableOpacity>

      <View style={styles.progressWrapper}>
        <StepProgressBar totalSteps={totalSteps} currentStep={currentStep} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 20,
  },
  progressWrapper: {
    flex: 1,
    alignItems: "center",
    marginLeft: 60,
  },
});
