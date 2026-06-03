import { Colors } from "@/app/constants/Colors";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

type VetCardProps = {
  id?: number;
  full_name?: string;
  role?: string;
  avatarUrl?: string;
  online?: boolean;
  bio?: string | null;
  degree?: string | null;
};

const VetCard: React.FC<VetCardProps> = ({
  id,
  full_name,
  role,
  avatarUrl,
  bio,
  degree,
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/(tabs)/AppointmentPage",
          params: { vetId: id },
        })
      }
    >
      <View style={styles.card}>
        {/* Avatar */}
        <Image
          source={
            typeof avatarUrl === "string" ? { uri: avatarUrl } : avatarUrl
          }
          style={styles.avatar}
        />

        {/* Info */}
        <View style={styles.info}>
          <Text style={styles.name}>{full_name}</Text>
          <Text style={styles.role}>
            {role}: {degree}
          </Text>
          <Text style={styles.role}>{bio}</Text>
          {/* Online status */}
          {/* {showOnlineStatus && (
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: online ? "green" : "gray" },
              ]}
            />
            <Text
              style={[
                styles.statusText,
                { color: online ? "green" : "gray" },
              ]}
            >
              {online ? "Online" : "Offline"}
            </Text>
          </View>
        )} */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VetCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginHorizontal: 10,
    marginTop: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
  },
  role: {
    fontSize: 14,
    color: Colors.subtitleColor,
    marginTop: 4,
  },
  bio: {
    fontSize: 12,
    color: Colors.subtitleColor,
    marginTop: 4,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "green",
    marginRight: 6,
  },
  statusText: {
    fontSize: 13,
    color: "green",
    fontWeight: "500",
  },
});
