import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Colors } from "@/app/constants/Colors";

const EditProfileForm = ({ form, onChange }) => (
  <View style={styles.card}>
    <Text style={styles.label}>Full Name</Text>
    <TextInput
      value={form.full_name}
      onChangeText={(text) => onChange("full_name", text)}
      style={styles.input}
    />

    <Text style={styles.label}>Email</Text>
    <TextInput
      value={form.email}
      onChangeText={(text) => onChange("email", text)}
      style={styles.input}
      keyboardType="email-address"
    />

    <Text style={styles.label}>Phone</Text>
    <TextInput
      value={form.phone}
      onChangeText={(text) => onChange("phone", text)}
      style={styles.input}
      keyboardType="phone-pad"
    />

    <Text style={styles.label}>Address</Text>
    <TextInput
      value={form.address}
      onChangeText={(text) => onChange("address", text)}
      style={styles.input}
    />

    <Text style={styles.label}>Date of Birth</Text>
    <TextInput
      value={form.dob}
      onChangeText={(text) => onChange("dob", text)}
      style={styles.input}
      placeholder="YYYY-MM-DD"
    />
  </View>
);

export default EditProfileForm;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: Colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  label: { fontSize: 14, color: Colors.subtitleColor, marginBottom: 5 },
  input: {
    backgroundColor: Colors.background,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    color: Colors.text,
  },
});
