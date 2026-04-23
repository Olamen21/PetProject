import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import CommonButton from "../../../shared/components/CommonButton";
import CommonTextInput from "../../../shared/components/CommonTextInput";
import AuthFooterLink from "../components/AuthFooterLink";
import AuthHeader from "../components/AuthHeader";
import DividerWithText from "../components/DividerWithText";
import Colors from "../../../constants/Colors";

export default function SignupScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={require("../../../../assets/images/intro_bg.png")}
          style={styles.image}
        />
        <View style={styles.negativeMarginBottom}>
          <AuthHeader
            title="Sign Up"
            subtitle="Please sign up to continue."
            titleColor= {Colors.primary}
            titleSize={26}
            subtitleColor= {Colors.subtitleColor}
            subtitleSize={15}
          />
        </View>
        <View style={styles.negativeMarginBottom}>
          <CommonTextInput
            icon="person-outline"
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <CommonTextInput
            icon="mail-outline"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <CommonTextInput
            icon="lock-closed-outline"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            rightIcon={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#8B95A5"
                />
              </TouchableOpacity>
            }
          />
        </View>
        <View style={styles.negativeMarginBottom}>
          <CommonButton
            title="Sign Up"
            onPress={() => router.replace("./(tabs)/AddPetScreen")}
            backgroundColor= {Colors.primary}
            textColor= {Colors.white}
            style={{ margin: 10 }}
            bordered={true}
            borderColor= {Colors.border}
            borderWidth={2}
          />
        </View>
        <View style={styles.negativeMarginBottom}>
          <DividerWithText text="or Sign Up with" />
        </View>
        <View style={styles.negativeMarginBottom}>
          <CommonButton
            title="Sign Up with Google"
            onPress={() => router.replace("./(tabs)/home")}
            iconName="logo-google"
            iconColor= {Colors.primary}
            backgroundColor= {Colors.white}
            textColor= {Colors.primary}
            style={{ margin: 10 }}
            bordered={true}
            borderColor= {Colors.border}
            borderWidth={2}
          />
        </View>

        <AuthFooterLink
          text="Already have an account?"
          linkText="Login"
          onPress={() => router.replace("./LoginScreen")}
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
    padding: 30,
    paddingTop: 60,
    paddingBottom: 40,
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: "center",
    marginBottom: 20,
  },
  negativeMarginBottom: {
    marginBottom: -5,
  },
 

  signupText: {
    color: "#8B95A5",
    textAlign: "center",
    fontSize: 15,
  },
  signupLink: {
    color: "#5A7863",
    fontWeight: "600",
  },
});
