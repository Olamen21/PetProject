import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import CommonTextInput from "@/app/shared/components/CommonTextInput";
import { Colors } from "@/app/constants/Colors";

const ChangePasswordForm = ({ form, secure, onChange, toggleSecure }) => (
  <View style={styles.card}>
    <CommonTextInput
      label="Current Password"
      placeholder="Current Password"
      value={form.currentPassword}
      onChangeText={(text) => onChange("currentPassword", text)}
      secureTextEntry={secure.current}
      icon="lock-closed"
      rightIcon={
        <TouchableOpacity onPress={() => toggleSecure("current")}>
          <Feather
            name={secure.current ? "eye-off" : "eye"}
            size={20}
            color={Colors.subtitleColor}
          />
        </TouchableOpacity>
      }
    />

    <CommonTextInput
      label="New Password"
      placeholder="New Password"
      value={form.newPassword}
      onChangeText={(text) => onChange("newPassword", text)}
      secureTextEntry={secure.new}
      icon="lock-closed"
      rightIcon={
        <TouchableOpacity onPress={() => toggleSecure("new")}>
          <Feather
            name={secure.new ? "eye-off" : "eye"}
            size={20}
            color={Colors.subtitleColor}
          />
        </TouchableOpacity>
      }
    />

    <CommonTextInput
      label="Confirm Password"
      placeholder="Confirm Password"
      value={form.confirmPassword}
      onChangeText={(text) => onChange("confirmPassword", text)}
      secureTextEntry={secure.confirm}
      icon="lock-closed"
      rightIcon={
        <TouchableOpacity onPress={() => toggleSecure("confirm")}>
          <Feather
            name={secure.confirm ? "eye-off" : "eye"}
            size={20}
            color={Colors.subtitleColor}
          />
        </TouchableOpacity>
      }
    />
  </View>
);

export default ChangePasswordForm;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
});
