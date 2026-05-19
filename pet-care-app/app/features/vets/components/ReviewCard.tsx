import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/app/constants/Colors";

type ReviewCardProps = {
  avatarUrl: string | number;
  name: string;
  rating: number;
  date: string;
  review: string;
};

const ReviewCard: React.FC<ReviewCardProps> = ({ avatarUrl, name, rating, date, review }) => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={typeof avatarUrl === "string" ? { uri: avatarUrl } : avatarUrl}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#F77B4E" />
            <Text style={styles.rating}>{rating}/5 | {date}</Text>
          </View>
        </View>
      </View>

      {/* Review content */}
      <Text style={styles.review}>{review}</Text>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 25,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  rating: {
    fontSize: 12,
    color: Colors.subtitleColor,
    marginLeft: 4,
  },
  review: {
    fontSize: 12,
    color: Colors.subtitleColor,
    lineHeight: 18,
    fontWeight: "500",
  },
});
