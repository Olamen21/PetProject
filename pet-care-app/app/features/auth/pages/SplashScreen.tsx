import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("./IntroScreen");
    }, 3000);
    return () => clearTimeout(timer);
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 40, fontWeight: "bold", color: "#5A7863" },
});
