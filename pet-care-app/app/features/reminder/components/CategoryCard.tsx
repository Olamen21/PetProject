import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  backgroundColor?: string;
  iconColor?: string;
  onPress?: () => void;
  highlightColor?: string;
  iconCircleColor?: string;
}

export default function CategoryCard({
  label,
  iconName,
  onPress,
  highlightColor = "#F77B4E",
  backgroundColor = "#FFFFFF",
  iconCircleColor = "#F2F2F2",
}: Props) {
  return (
    <TouchableOpacity style={[styles.wrapper, { backgroundColor }]} onPress={onPress}>
        <View style={[{ backgroundColor: highlightColor }, styles.highlightBar,]} />

        <View style={styles.card}>
            <View style={[{ backgroundColor: iconCircleColor }, styles.iconCircle]}>
                <Ionicons name={iconName} size={24} color="#1D1D1D" />
            </View>
            <Text style={styles.label}>{label}</Text>
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 6,
        elevation: 2,
        backgroundColor: "#fff",
        borderRadius: 16,
        width: "50%",
    },

    highlightBar: {
        width: 4,
        height: "50%",
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },

    card: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginVertical: 6,
    },
    iconCircle: {
        width: 48,
        height: 58,
        borderRadius: 120,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    label: {
        fontSize: 12,
        fontWeight: "400",
        color: "#1D1D1D",
    },
});