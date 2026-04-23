import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

type Props = {
  otp: string[];
  inputs: React.MutableRefObject<(TextInput | null)[]>;
  handleChange: (text: string, index: number) => void;
  handleKeyPress: (e: any, index: number) => void;
};

export default function OtpInputGroup({
  otp,
  inputs,
  handleChange,
  handleKeyPress,
}: Props) {
  return (
    <View style={styles.otpRow}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputs.current[index] = ref;
          }}
          style={[
            styles.otpInput,
            {
              borderColor: digit ? "#5A7863" : "#EBF4DD",
            },
          ]}
          keyboardType="number-pad"
          maxLength={1}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          textAlign="center"
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  otpInput: {
    width: 55,
    height: 55,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    color: "#5A7863",
    shadowColor: "#5A7863",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    textAlign: "center",
  },
});
