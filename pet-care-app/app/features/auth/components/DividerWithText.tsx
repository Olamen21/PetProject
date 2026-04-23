import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DividerWithText({ text }: { text: string }) {
  return (
    <View style={styles.divider}>
      <View style={styles.line} />
      <Text style={styles.orText}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  line: { flex: 1, height: 1, backgroundColor: "#E0E4E8" },
  orText: { marginHorizontal: 15, color: "#8B95A5", fontSize: 14 },
});
