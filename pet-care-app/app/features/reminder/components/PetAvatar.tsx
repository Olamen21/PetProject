import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

type PetAvatarProps = {
  source: any;  
  isSelected?: boolean;
  onPress?: () => void;
};

export default function PetAvatar({ source, isSelected, onPress }: PetAvatarProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.wrapper}>
        <Image
          source={source}
          style={styles.avatar}
          resizeMode="cover"
        />
        {isSelected && (
          <View style={styles.checkWrapper}>
            <Ionicons name="checkmark" size={16} color="#fff"/>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 84,
    marginRight: 12,
    marginBottom: 8,
    borderRadius: 60,
    borderWidth: 2,
    overflow: 'hidden',
    borderStyle: 'solid',
  },
  avatar: {
    width: 80,
    height: 120,
  },
  checkWrapper: {
    position: "absolute",
    bottom: 0, // nằm phía dưới trong ảnh
    backgroundColor: "#F77B4E",
    borderRadius: 12,
    padding: 2,
    width: 64,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});