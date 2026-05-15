import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

type Props = {
  value: string;
  onChangeText: (val: string) => void;
  wordCount: number;
};

export default function DescriptionInput({ value, onChangeText, wordCount }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.wordCount}>{wordCount}/120 words</Text>
      </View>
      <TextInput
        value={value}
        style={styles.input}
        multiline={true}
        numberOfLines={4}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    marginBottom: 8,
  },
  label: { fontSize: 16, fontWeight: "600",  marginBottom: 8 },
  wordCount: { fontSize: 14, color: "#5C5C5C" },
  input: {
    backgroundColor: '#fff',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    textAlignVertical: 'top',
    minHeight: 96,
  },
});