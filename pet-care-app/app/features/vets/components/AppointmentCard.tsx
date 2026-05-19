import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/app/constants/Colors";
import CommonButton from "@/app/shared/components/CommonButton";

type AppointmentCardProps = {
  avatarUrl: string | number;
  petName: string;
  doctorName: string;
  time: string;
  onJoin?: () => void;
};

const AppointmentCard: React.FC<AppointmentCardProps> = ({ avatarUrl, petName, doctorName, time, onJoin }) => {
  return (
    <View style={styles.card}>
      {/* Avatar */}
      <Image
        source={typeof avatarUrl === "string" ? { uri: avatarUrl } : avatarUrl}
        style={styles.avatar}
      />

      {/* Info */}
      <View style={styles.info}>
        <View style={styles.nameContainer}>
            <Ionicons name="paw-outline" size={14} color="#5C5C5C"/>
            <Text style={styles.nickname}>{petName}</Text>
        </View>
        <Text style={styles.doctor}>{doctorName}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>

      {/* Join button */}
      <CommonButton 
        title="Join call"
        onPress={() => onJoin}
        iconName="call-outline"
        iconSize={18}
        iconColor="#5C5C5C"
        backgroundColor="#E0E0E0"
        textColor="#5C5C5C"
        style={styles.joinButton}
        textStyle={styles.joinText}
      />
    </View>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 10,
    shadowColor: "#000",
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
    backgroundColor: "#E0E0E0",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  joinText: {
    fontSize: 12,
    color: "#5C5C5C",
    marginLeft: 4,
    fontWeight: "500",
  },
});
