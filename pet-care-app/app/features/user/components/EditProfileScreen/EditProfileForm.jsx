import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Colors } from "@/app/constants/Colors";
import CommonTextInput from "@/app/shared/components/CommonTextInput";
import CommonDateTimePicker from "@/app/shared/components/CommonDateTimePicker";

const EditProfileForm = ({ form, onChange }) => (
  
  <View style={styles.card}>
    <CommonTextInput
      label="Full Name"
      placeholder="Full Name"
      value={form.full_name}
      onChangeText={(text) => onChange("full_name", text)}
      icon="person-outline"
    />
    <CommonTextInput
      label="Phone"
      placeholder="090...."
      value={form.phone}
      onChangeText={(text) => onChange("phone", text)}
      icon="call-outline"
    />
    <CommonTextInput
      label="Address"
      placeholder="Address"
      value={form.address}
      onChangeText={(text) => onChange("address", text)}
      icon="location-outline"
    />

    <CommonDateTimePicker
  label="Date of Birth"
  value={form.dob}
  onChange={(date) => onChange("dob", date)}
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
