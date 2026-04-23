import React from "react";
import { StyleSheet, Text, TextStyle } from "react-native";

type Props = {
  title: string;
  subtitle?: string;
  titleColor?: string;
  titleSize?: number;
  subtitleColor?: string;
  subtitleSize?: number;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
};

export default function AuthHeader({
  title,
  subtitle,
  titleColor = "#5A7863",
  titleSize = 36,
  subtitleColor = "#8B95A5",
  subtitleSize = 16,
  titleStyle,
  subtitleStyle,
}: Props) {
  return (
    <>
      <Text
        style={[
          styles.title,
          { color: titleColor, fontSize: titleSize },
          titleStyle,
        ]}
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          style={[
            styles.subtitle,
            { color: subtitleColor, fontSize: subtitleSize },
            subtitleStyle,
          ]}
        >
          {subtitle}
        </Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 30,
  },
});
