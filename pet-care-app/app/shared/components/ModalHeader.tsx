import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "../../constants/Colors"; //

interface Props {
  title: string;
  onClose: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
}

export default function ModalHeader({ title, onClose, iconName }: Props) {
  return (
    <View style={styles.modalHeader}>
      <View style={styles.leftSection}>
        {iconName && (
          <Ionicons
            name={iconName}
            size={24}
            color={Colors.primary}
            style={styles.headerIcon}
          />
        )}
        <Text style={styles.title}>{title}</Text>
      </View>

      <TouchableOpacity
        onPress={onClose}
        activeOpacity={0.7}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="close-circle-outline" size={26} color={Colors.text} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
  },
});
