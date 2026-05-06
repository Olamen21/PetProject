import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { getToken, removeToken } from "../services/AuthStorage";
import {jwtDecode} from "jwt-decode";
import CommonMessage from "@/app/shared/components/CommonMessage";

export default function SplashScreen() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();

      if(!token) {
        setTimeout(() => {
          router.replace("./IntroScreen");
        }, 3000);
        return;
      }
      try {
        const decoded: {exp: number} = jwtDecode(token);
        if(Date.now() >= decoded.exp *1000) {
          await removeToken();
          router.replace("./LoginScreen");
        } else {
          router.replace("./HomeScreen");
        }
      } catch (error) {
        setErrorMessage("Token không hợp lệ: " + error);
        await removeToken();
        router.replace("./LoginScreen");
      }
    };

    checkAuth();
  }, [router]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/images/logo.png")}
        style={{ width: 300, height: 300 }}
      />

      <Text style={styles.title}>Pet Care</Text>
      <ActivityIndicator
        size="large"
        color="#5A7863"
        style={{ marginTop: 20 }}
      />
      {errorMessage && <CommonMessage type="error" message={errorMessage} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 40, fontWeight: "bold", color: "#5A7863" },
});