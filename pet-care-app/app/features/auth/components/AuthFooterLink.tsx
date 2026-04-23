import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  text: string;          
  linkText: string;      
  onPress: () => void;   
};

export default function AuthFooterLink({ text, linkText, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>
        {text} <Text style={styles.link}>{linkText}</Text>
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: "#8B95A5",
    textAlign: "center",
  },
  link: {
    color: "#5A7863",
    fontWeight: "600",
  },
});
