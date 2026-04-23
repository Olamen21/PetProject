import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CommonButton from "../../../shared/components/CommonButton";
import AuthFooterLink from "../components/AuthFooterLink";
import {Colors} from "../../../constants/Colors"; 

export default function IntroPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../../../assets/images/intro_bg.png")}
          style={styles.image}
        />
        <Text style={styles.title}>Your Pet, Our Priority</Text>
        <Text style={styles.description}>
          Stay organized, stay caring, and give your pet the best life possible.
        </Text>
      </View>

      <View style={styles.bottomSection}>
        <CommonButton
          title="Get Started"
          onPress={() => router.replace("./SignupScreen")}
          backgroundColor= {Colors.primary}
          textColor= {Colors.white}
          style={{ margin: 10 }}
          bordered={true}
          borderColor= {Colors.border}
          borderWidth={2}
        />

        <AuthFooterLink
          text="Already have an account?"
          linkText="Login"
          onPress={() => router.replace("./LoginScreen")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: { width: 350, height: 350, marginBottom: 60, marginTop: 40 },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    color: "#6a6a6a",
    lineHeight: 24,
  },
  bottomSection: { paddingHorizontal: 25, paddingBottom: 50 },
  loginText: { fontSize: 16, textAlign: "center" },
  loginLink: { color: "#5A7863", fontWeight: "600" },
});