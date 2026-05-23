import React from "react";
import { View, Text, StyleSheet } from "react-native";

type StepIndicatorProps = {
  currentStep: number; // 1 = Date&Time, 2 = Patient info, 3 = Payment info
};

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = ["Date&Time", "Patient info", "Confirm"];

  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;

        return (
          <React.Fragment key={step}>
            <View style={styles.stepContainer}>
              <View
                style={[
                  styles.circle,
                  { backgroundColor: isActive ? "#3A7BD5" : "#ccc" },
                ]}
              >
                <Text style={styles.circleText}>{stepNumber}</Text>
              </View>
              <Text
                style={[
                  styles.label,
                  { color: isActive ? "#3A7BD5" : "#999" },
                ]}
              >
                {step}
              </Text>
            </View>

            {/* Vẽ đường nối trừ bước cuối */}
            {index < steps.length - 1 && (
              <View style={styles.line} />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
};

export default StepIndicator;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  stepContainer: {
    alignItems: "center",
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  circleText: {
    color: "#fff",
    fontWeight: "600",
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "500",
  },
  line: {
    width: 40,
    height: 2,
    backgroundColor: "#ccc",
    marginHorizontal: 8,
  },
});
