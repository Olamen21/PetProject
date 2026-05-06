import React from "react";
import { View, StyleSheet } from "react-native";

type Props = {
  totalSteps: number;
  currentStep: number;
  activeColor?: string;
  inactiveColor?: string;
};

export default function StepProgressBar({
  totalSteps,
  currentStep,
  activeColor = "#5A7863",
  inactiveColor = "#E0E4E8",
}: Props) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.step,
            {
              backgroundColor: index <= currentStep ? activeColor : inactiveColor,

            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
    justifyContent: "center",
  },
  step: {
    width: 40,
    height: 8,
    borderRadius: 4,
  },
});
