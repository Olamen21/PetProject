import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/app/constants/Colors";
import { Review } from "../types/Review";


const ReviewCard: React.FC<Review> = ({ avatar_url, user_name, rating, created_at, comment }) => {
  const firstLetter = user_name ? user_name.charAt(0).toUpperCase() : "?";

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        {avatar_url ? (
          <Image
            source={{ uri: avatar_url }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{firstLetter}</Text>
          </View>
        )}
        <View style={styles.info}>
          <Text style={styles.name}>{user_name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#F77B4E" />
            <Text style={styles.rating}>{rating}/5 | {created_at}</Text>
          </View>
        </View>
      </View>

      {/* Review content */}
      <Text style={styles.review}>{comment}</Text>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  card: { marginVertical: 8 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  avatar: { width: 48, height: 48, borderRadius: 25, marginRight: 12 },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: "500", color: Colors.text },
  ratingContainer: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  rating: { fontSize: 12, color: Colors.subtitleColor, marginLeft: 4 },
  review: { fontSize: 12, color: Colors.subtitleColor, lineHeight: 18, fontWeight: "500" },
});
