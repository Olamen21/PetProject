import CommonButton from "@/app/shared/components/CommonButton";
import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "@/app/constants/Colors";
import React, { useState } from "react";
import { MockVets } from "../data/MockVet";
import VetCard from "./VetCard";
import RecommentCard from "./RecommentCard";
import { Vets } from "../types/Vets";
import { getAllVets } from "../services/vetService";
import { useFocusEffect } from "expo-router";

export default function VeterinariansComponent() {
  const [vets, setVets] = useState<Vets[]>([]);
  useFocusEffect(
    React.useCallback(() => {
      const fetchVets = async () => {
        try {
          const data = await getAllVets();
          console.log("Fetching vets..." + JSON.stringify(data));

          setVets(data);
        } catch (error) {
          console.error("Không thể tải vets:", error);
        }
      };
      console.log(
        "Fetching vets..." + vets.map((vet) => vet.full_name).join(", "),
      );
      fetchVets();
    }, []),
  );
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.reminderCardHeader}>
        <Text style={styles.textReminder}>Upcoming appointments</Text>
      </View>
      <View style={styles.icon}>
        <Ionicons
          name="calendar-number-outline"
          color={Colors.primary}
          size={100}
        />
      </View>
      <Text style={styles.noRemindersText}>
        You don’t have any appointments yet. Book a vet call to keep your pet on
        track
      </Text>
      <CommonButton
        title="Book appointment"
        onPress={() => console.log("Book appointment")}
        iconName="timer-outline"
        backgroundColor="#5A7863"
        style={{
          marginBottom: 20,
          paddingVertical: 12,
          marginHorizontal: 90,
        }}
      />

      {/* Veterinarians */}
      <View style={styles.cardHeader}>
        <Text style={styles.textCard}>Veterinarians</Text>
        <TouchableOpacity style={styles.buttonViewAll}>
          <Text style={styles.textViewAll}>View all</Text>
          <Ionicons
            name="chevron-forward-outline"
            color={Colors.primary}
            size={20}
          />
        </TouchableOpacity>
      </View>
      {vets.map((vet) => (
        <VetCard
          key={vet.id}
          full_name={vet.full_name}
          role={vet.role}
          avatarUrl={vet.avatar_url}
          bio={vet.doctorProfile?.bio}
          degree={vet.doctorProfile?.degree}
        />
      ))}

      {/* Recommended vets */}
      <View style={styles.cardHeader}>
        <Text style={styles.textCard}>Recommended vets</Text>
        <TouchableOpacity style={styles.buttonViewAll}>
          <Text style={styles.textViewAll}>View all</Text>
          <Ionicons
            name="chevron-forward-outline"
            color={Colors.primary}
            size={20}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tipScrollView}
      >
        {vets.map((vet) => (
          <RecommentCard
            key={vet.id}
            id={vet.id}
            rating={4.8}
            name={vet.full_name}
            degree={vet.doctorProfile?.degree}
            bio={vet.doctorProfile?.bio}
            avatarUrl={vet.avatar_url}
          />
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  reminderCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 20,
  },
  textReminder: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3B4953",
  },
  icon: {
    alignItems: "center",
    marginTop: 20,
  },
  noRemindersText: {
    textAlign: "center",
    color: "#3B4953",
    fontSize: 16,
    marginHorizontal: 40,
    marginTop: 10,
    fontWeight: "500",
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 20,
  },
  textCard: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
  },
  buttonViewAll: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  textViewAll: {
    color: Colors.primary,
    fontWeight: "500",
    fontSize: 12,
  },
  tipScrollView: {
    marginLeft: 10,
    marginBottom: 120,
  },
});
