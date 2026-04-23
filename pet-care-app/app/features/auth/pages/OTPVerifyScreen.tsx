import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AuthHeader from "../components/AuthHeader";
import AuthFooterLink from "../components/AuthFooterLink";
import OtpInputGroup from "../components/OtpInputGroup";
import CommonButton from "../../../shared/components/CommonButton";

export default function OtpVerifyScreen({ email = "mcraigw@outlook.com" }) {
  const router = useRouter();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputs = useRef<(TextInput | null)[]>([]);

  const isOtpComplete = otp.every((digit) => digit.trim() !== "");

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (index < 5) {
        inputs.current[index + 1]?.focus();
      }
    } else if (text === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const verifyOtp = () => {
    const code = otp.join("");
    if (code.length < 6) return;
    router.replace("./(tabs)/home");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.replace("./LoginScreen")}>
            <Ionicons name="arrow-back" size={28} color="#5A7863" />
          </TouchableOpacity>
        </View>
        <AuthHeader
          title="Check your email"
          subtitle={`We sent a reset link to ${email}. Enter 6 digit code mentioned in the email`}
          titleColor="#5A7863"
          titleSize={26}
          subtitleColor="#4F5E6F"
          subtitleSize={15}
        />

        <OtpInputGroup
          otp={otp}
          inputs={inputs}
          handleChange={handleChange}
          handleKeyPress={handleKeyPress}
        />

        <CommonButton
          title="Verify Code"
          onPress={verifyOtp}
          backgroundColor={isOtpComplete ? "#5A7863" : "#EBF4DD"}
          textColor={isOtpComplete ? "#FFFFFF" : "#000000"}
          bordered={false}
        />

        <View style={styles.resendContainer}>
          <AuthFooterLink
            text=" Haven’t got the email yet?"
            linkText="Resend email"
            onPress={() => router.replace("./LoginScreen")}
          />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#F5F7FA",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#5A7863", 
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#4F5E6F",
    marginBottom: 32,
  },
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
    borderColor: "#5A7863",
    shadowColor: "#5A7863",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    textAlign: "center",
  },

  resendContainer: {
    marginTop: 24,
    alignItems: "center",
  },
});