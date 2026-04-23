import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import CommonButton from "../../../shared/components/CommonButton";
import CommonTextInput from "../../../shared/components/CommonTextInput";
import AuthHeader from "../components/AuthHeader";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.replace("./LoginScreen")}>
            <Ionicons name="arrow-back" size={28} color="#5A7863" />
          </TouchableOpacity>
        </View>

        <AuthHeader
          title="Reset Password"
          subtitle="Enter the email associated with your account and we'll send instructions to reset it."
          titleColor="#5A7863"
          titleSize={26}
          subtitleColor="#4F5E6F"
          subtitleSize={15}
        />

        <Text style={styles.label}>Email address</Text>
        <CommonTextInput
          icon="mail-outline"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          bordered
          borderColor="#D0D5DD"
          borderWidth={1}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <CommonButton
          title="Reset Password"
          onPress={() => router.replace("./(tabs)/OTPVerifyScreen")}
          backgroundColor="#5A7863"
          textColor="#ffffff"
          bordered={false}
          style={styles.button}
        />
      </View>
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
  label: {
    fontSize: 15,
    fontWeight: "500",
    color: "#2D3E50",
    marginBottom: 8,
  },
  button: {
    marginTop: 20,
    shadowColor: "#5A7863",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
});
