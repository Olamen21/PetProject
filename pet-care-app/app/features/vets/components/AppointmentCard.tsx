import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/app/constants/Colors";

type AppointmentCardProps = {
  id: number;
  date: string;
  time: string;
  vet_name: string;
  vet_image: string | number;
  pet_name: string;
  status: string;
  onReviewPress?: (id: number) => void;
};

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  id,
  vet_image,
  pet_name,
  vet_name,
  status,
  date,
  time,
  onReviewPress,
}) => {
  return (
    <View style={styles.card}>
      {/* Avatar */}
      <Image
        source={typeof vet_image === "string" ? { uri: vet_image } : vet_image}
        style={styles.avatar}
      />

      {/* Info */}
      <View style={styles.info}>
        <View style={styles.nameContainer}>
          <Ionicons name="paw-outline" size={14} color="#5C5C5C" />
          <Text style={styles.nickname}>{pet_name}</Text>
        </View>
        <Text style={styles.doctor}>{vet_name}</Text>
        <Text style={styles.time}>
          {date} at {time}
        </Text>
      </View>

      <View style={styles.actionContainer}>
        <View
          style={[
            styles.statusBadge,
            status === "CONFIRMED"
              ? styles.statusConfirmed
              : status === "PENDING"
                ? styles.statusPending
                : styles.statusCancelled,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              status === "CONFIRMED"
                ? styles.textConfirmed
                : status === "PENDING"
                  ? styles.textPending
                  : styles.textCancelled,
            ]}
          >
            {status}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.reviewButton}
          onPress={() => onReviewPress && onReviewPress(id)}
        >
          <Text style={styles.reviewButtonText}>Review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 10,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  nickname: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.subtitleColor,
  },
  doctor: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: "500",
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: Colors.subtitleColor,
    fontWeight: "500",
    marginTop: 2,
  },
  joinButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.gray,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  joinText: {
    fontSize: 12,
    color: Colors.text_secondary,
    marginLeft: 4,
    fontWeight: "500",
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusConfirmed: {
    backgroundColor: Colors.bg_tag_green,
  },
  statusPending: {
    backgroundColor: Colors.bg_tag_warning,
  },
  statusCancelled: {
    backgroundColor: Colors.bg_error,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "500",
  },
  textConfirmed: {
    color: Colors.text_verified,
  },
  textPending: {
    color: Colors.text_tag_orange,
  },
  textCancelled: {
    color: Colors.error,
  },
  reviewButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  reviewButtonText: {
    fontSize: 12,
    color: Colors.white,
    fontWeight: "500",
  },
});
