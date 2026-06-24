import CommonButton from "@/app/shared/components/CommonButton";
import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "@/app/constants/Colors";
import React, { useState } from "react";
import VetCard from "./VetCard";
import RecommentCard from "./RecommentCard";
import { Vets } from "../types/Vets";
import {
  getAllPetUser,
  getAllVets,
  getAppointmentsByUserId,
  getProfile,
} from "../services/vetService";
import { useFocusEffect, useRouter } from "expo-router";
import AppointmentCard from "./AppointmentCard";
import { Appointment } from "../types/Appointment";
import type { Rating } from "../types/Review";

export default function VeterinariansComponent() {
  const [vets, setVets] = useState<Vets[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      const fetchVets = async () => {
        try {
          const data = await getAllVets();
          const getUser = await getProfile();
          const getAllPetByUserId = await getAllPetUser();
          const userId = getUser.id;
          const appointmentsData = await getAppointmentsByUserId(userId);

          const mergedAppointments = appointmentsData.map(
            (appointment: Appointment) => {
              const pet = getAllPetByUserId.find(
                (p: { id: number; name: string }) =>
                  p.id === appointment.pet_id,
              );
              const vet = data.find((v: Vets) => v.id === appointment.vet_id);
              const appointmentDate = new Date(appointment.appointment_date);
              const dateUTC = appointmentDate.toISOString().split("T")[0];
              const timeUTC = appointmentDate
                .toISOString()
                .split("T")[1]
                .slice(0, 5);
              return {
                id: appointment.id,
                vet_id: vet.id,
                pet_name: pet ? pet.name : "Unknown Pet",
                vet_name: vet ? vet.full_name : "Unknown Vet",
                vet_image: vet ? vet.avatar_url : null,
                date: dateUTC,
                time: timeUTC,
                status: appointment.status,
                is_reviewed: appointment.is_reviewed,
              };
            },
          );
          setAppointments(mergedAppointments);
          console.log(
            "Fetching appointments..." + JSON.stringify(mergedAppointments),
          );
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
  const handleReview = (appointment_id: number, vet_id: number) => {
    router.push({
      pathname: "/(tabs)/GiveFeedbackPage",
      params: { vetId: vet_id, appointment_id: appointment_id },
    });
  };

  const handleBooking = (vetId: number | undefined) => {
    router.push({
      pathname: "/(tabs)/AppointmentPage",
      params: { vetId: vetId },
    });
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.reminderCardHeader}>
        <Text style={styles.textReminder}>Upcoming appointments</Text>
      </View>
      {appointments.length > 0 ? (
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.appointmentScrollView}
          >
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                id={appointment.id}
                vet_id={appointment.vet_id}
                pet_name={appointment.pet_name}
                vet_name={appointment.vet_name}
                vet_image={appointment.vet_image}
                date={appointment.date}
                time={appointment.time}
                status={appointment.status}
                onReviewPress={handleReview}
                is_reviewed={appointment.is_reviewed}
              />
            ))}
          </ScrollView>
        </View>
      ) : (
        <View style={{ alignItems: "center" }}>
          <View style={styles.icon}>
            <Ionicons
              name="calendar-number-outline"
              color={Colors.primary}
              size={100}
            />
          </View>
          <Text style={styles.noRemindersText}>
            You don’t have any appointments yet. Book a vet call to keep your
            pet on track
          </Text>
          {/* <CommonButton
            title="Book appointment"
            onPress={() => console.log("Book appointment")}
            iconName="timer-outline"
            backgroundColor="#5A7863"
            style={{
              marginBottom: 20,
              paddingVertical: 12,
              marginHorizontal: 90,
            }}
          /> */}
        </View>
      )}


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
          id={vet.id}
          full_name={vet.full_name}
          role={vet.role}
          avatarUrl={vet.avatar_url}
          bio={vet.doctorProfile?.tags}
          degree={vet.doctorProfile?.degree}
          onPress={() => handleBooking(vet.id)}
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
            name={vet.full_name}
            degree={vet.doctorProfile?.degree}
            bio={vet.doctorProfile?.tags}
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
    marginBottom: 10,
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
    marginTop: 10,
    marginBottom: 100,
  },
  appointmentScrollView: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});
