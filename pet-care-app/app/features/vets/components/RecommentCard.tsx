import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "@/app/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type RecommentCardProps = {
  rating: number;
  name: string;
  specialty: string;
  avatarUrl: number | string;
};

const RecommentCard: React.FC<RecommentCardProps> = ({ rating, name, specialty, avatarUrl }) => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push("/(tabs)/AppointmentPage")}>
      <View
        style={styles.card}
      >
        {/* Avatar */}
        <Image 
          source={typeof avatarUrl === "string" ? { uri: avatarUrl } : avatarUrl} 
          style={styles.avatar} 
        />
      </View>
       {/* Info */}
      <View style={styles.info}>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#F77B4E" /> 
          <Text style={styles.rating}>
            {rating.toFixed(1)}
          </Text>
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.specialty}>{specialty}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RecommentCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    marginTop: 16,
    backgroundColor: Colors.secondary,
    width: 250,
    marginRight: 16,
  },
  avatar: {
    width: 100,
    height: 148,
  },
  info: {
    width: 250,
    padding: 10,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: Colors.white,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  ratingContainer: { 
    flexDirection: "row", 
    gap: 4, 
    alignItems: "center"
  },
  rating: {
    fontSize: 12,
    fontWeight: "500",
    color:"#5C5C5C",
  },
  name: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text,
  },
  specialty: {
    fontSize: 12,
    color: "#5C5C5C",
    fontWeight: "500",
    marginTop: 2,
  },
});
