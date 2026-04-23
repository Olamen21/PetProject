import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CommonButton from "../../../shared/components/CommonButton";
import AuthFooterLink from "../components/AuthFooterLink";
import AuthHeader from "../components/AuthHeader";
import DividerWithText from "../components/DividerWithText";
import CommonTextInput from "../../../shared/components/CommonTextInput";

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={require("../../../../assets/images/intro_bg.png")}
          style={styles.image}
        />

        <AuthHeader
          title="Login"
          subtitle="Please login to continue."
          titleColor="#5A7863"
          titleSize={26}
          subtitleColor="#4F5E6F"
          subtitleSize={15}
        />

        <CommonTextInput
          icon="person-outline"
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
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

        <TouchableOpacity
          style={styles.forgotContainer}
          onPress={() => router.replace("./ForgotPasswordScreen")}
        >
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        <CommonButton
          title="Login"
          onPress={() => router.replace("./(tabs)/home")}
          // iconName="stats-chart-outline"
          // iconColor="#5A7863"
          backgroundColor="#5A7863"
          textColor="#ffffff"
          style={{ margin: 10 }}
          bordered={true}
          borderColor="#F2F2F2"
          borderWidth={2}
        />

        <DividerWithText text="or login with" />
        <CommonButton
          title="Login with Google"
          onPress={() => router.replace("./(tabs)/home")}
          iconName="logo-google"
          iconColor="#5A7863"
          backgroundColor="#ffffff"
          textColor="#5A7863"
          style={{ margin: 10 }}
          bordered={true}
          borderColor="#F2F2F2"
          borderWidth={2}
        />

        <AuthFooterLink
          text="Don't have account?"
          linkText="Sign Up"
          onPress={() => router.replace("./SignUpScreen")}
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
    marginBottom: 30,
  },
  forgotContainer: {
    alignSelf: "flex-end",
    marginBottom: 10,
    marginTop: 5,
  },
  forgot: {
    color: "#90AB8B",
    fontSize: 15,
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
