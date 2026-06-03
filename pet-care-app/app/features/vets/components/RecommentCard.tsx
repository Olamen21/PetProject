import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "@/app/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type RecommentCardProps = {
  id?: number;
  rating: number;
  name: string;
  bio?: string | null;
  avatarUrl: number | string;
  degree?: string | null;
};

const RecommentCard: React.FC<RecommentCardProps> = ({ rating, name, bio, avatarUrl, degree, id }) => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push({ pathname: "/(tabs)/AppointmentPage", params: { vetId: id } })}>
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
        <Text style={styles.degree}>{degree} : {bio}</Text>
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
    height: 150,       
    borderRadius: 50, 
    resizeMode: "cover", 
    marginBottom: 8,  
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
  degree: {
    fontSize: 12,
    color: "#5C5C5C",
    fontWeight: "500",
    marginTop: 2,
  },
});
