import HeaderBar from "@/app/shared/components/HeaderBar";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import StepIndicator from "../components/StepIndicator";
import { Colors } from "@/app/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import AppointmentInfo from "../components/AppointmentInfo";
import CommonButton from "@/app/shared/components/CommonButton";
import { useCallback, useState } from "react";
import { Vets } from "../types/Vets";
import { bookAppointment, getPetById, getVetById } from "../services/vetService";
import { format } from "date-fns";

const ConfirmPage = () => {
  const router = useRouter();
  const { vetId, appointmentTime, petId, reason } = useLocalSearchParams<{
    vetId: string;
    appointmentTime: string;
    petId?: string;
    reason: string;
  }>();
  const [vet, setVet] = useState<Vets | null>(null);
  const [petName, setPetName] = useState<string>("");
  const appointmentDate = new Date(appointmentTime);
  const dateStr = format(appointmentDate, "yyyy-MM-dd");
  const timeStr = format(appointmentDate, "HH:mm");
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const dataVet = await getVetById(vetId);
        setVet(dataVet);
        const dataPet = await getPetById(petId!);
        const petName = dataPet.name;
        setPetName(petName);
      };
      fetchData();
    }, [vetId, appointmentTime, petId, reason]),
  );
  const handleConfirm = async () => {
    try {
        await bookAppointment({
            pet_id: petId!,
            vet_id: vetId,
            appointment_date: appointmentTime,
            user_note: reason,
        });
        console.log("Appointment booked successfully");
      router.push("/(tabs)/VetPage");
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBar
        title="Confirm Info"
        leftIcons={[
          {
            type: "ion",
            name: "chevron-back-outline",
            onPress: () => router.push("/(tabs)/PatientInfoPage"),
          },
        ]}
      />

      <StepIndicator currentStep={3} />

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Image
            source={
            typeof vet?.avatar_url === "string" ? { uri: vet?.avatar_url } : vet?.avatar_url
          }
            style={styles.avatar}
          />
          <View style={styles.info}>
            <View style={styles.petInfo}>
              <Ionicons
                name="logo-octocat"
                size={16}
                color={Colors.subtitleColor}
              />
              <Text style={styles.petName}>{petName}</Text>
            </View>
            <Text style={styles.name}>{vet?.full_name}</Text>
            <Text style={styles.role}>
              {vet?.role} : {vet?.doctorProfile?.degree}
            </Text>
          </View>
        </View>

        <AppointmentInfo date={dateStr} time={timeStr} />
      </View>

      <CommonButton
        title="Confirm"
        onPress={handleConfirm}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  card: {
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
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
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
  petInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    gap: 4,
  },
  petName: {
    fontSize: 10,
    color: Colors.subtitleColor,
    fontWeight: "500",
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
  },
  role: {
    fontSize: 12,
    color: Colors.subtitleColor,
    marginTop: 4,
  },
  button: {
    marginHorizontal: 10,
    marginTop: 350,
  },
});

export default ConfirmPage;
