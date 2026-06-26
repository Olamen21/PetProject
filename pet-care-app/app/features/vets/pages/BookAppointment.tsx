import HeaderBar from "@/app/shared/components/HeaderBar";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import StepIndicator from "../components/StepIndicator";
import VetCard from "../components/VetCard";
import { Colors } from "@/app/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { format, isSameDay } from "date-fns";
import WeeklyCalendar from "@/app/shared/components/WeeklyCalendarComponent";
import TimeSlotSelector from "../components/TimeSlotSelector";
import CommonButton from "@/app/shared/components/CommonButton";
import { useCallback, useState } from "react";
import { Vets } from "../types/Vets";
import { getAppointmentByVetId, getVetById } from "../services/vetService";

const BookAppointment = () => {
  const router = useRouter();
  const [isFullyBooked, setIsFullyBooked] = useState(false);
  const { vetId } = useLocalSearchParams<{ vetId: string }>();
  const [vet, setVet] = useState<Vets | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointmentVet, setAppointmentVet] = useState<any>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const morningSlots = ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30"];
  const eveningSlots = [
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
  ];
  useFocusEffect(
    useCallback(() => {
      const fetchVetDetails = async () => {
        try {
          const data = await getVetById(vetId);
          setVet(data);
          const getAppointmentByVet = await getAppointmentByVetId(vetId);
          setAppointmentVet(getAppointmentByVet);
        } catch (error) {
          console.error("Error fetching vet details:", error);
        }
      };
      fetchVetDetails();
    }, [vetId]),
  );
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);

    if (!appointmentVet) return;
    console.log("All appointments for vet:", appointmentVet.appointment_date);

    const appointmentsForDate = appointmentVet.filter((apt: any) => {
      const aptDate = new Date(apt.appointment_date);
      return isSameDay(aptDate, date);
    });

    const bookedTimes = appointmentsForDate.map((apt: any) => {
      const dateObj = new Date(apt.appointment_date);
      // Lấy giờ phút theo UTC
      const hours = dateObj.getUTCHours().toString().padStart(2, "0");
      const minutes = dateObj.getUTCMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    });

    const allSlots = [...morningSlots, ...eveningSlots];
    const freeSlots = allSlots.filter((slot) => !bookedTimes.includes(slot));

    if (freeSlots.length === 0) {
      setIsFullyBooked(true);
      setAvailableSlots([]);
    } else {
      setIsFullyBooked(false);
      setAvailableSlots(freeSlots);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const BookAppointment = () => {
    if (selectedDate && selectedTime) {
      const appointmentDateTime = new Date(selectedDate);
      appointmentDateTime.setHours(parseInt(selectedTime.split(":")[0]));
      appointmentDateTime.setMinutes(parseInt(selectedTime.split(":")[1]));
      const appointmentTimeString = format(
        appointmentDateTime,
        "yyyy-MM-dd'T'HH:mm:ss",
      );

      router.push({
        pathname: "/(tabs)/PatientInfoPage",
        params: { vetId, appointmentTime: appointmentTimeString },
      });
    } else {
      console.log("Please select both date and time before booking.");
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBar
        title="Appointment"
        leftIcons={[
          {
            type: "ion",
            name: "chevron-back-outline",
            onPress: () =>
              router.push({
                pathname: "/(tabs)/AppointmentPage",
                params: { vetId },
              }),
          },
        ]}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }} // thêm khoảng trống cuối
      >
        <StepIndicator currentStep={1} />

      <VetCard
        full_name={vet?.full_name}
        role={vet?.role}
        avatarUrl={vet?.avatar_url}
        degree={vet?.doctorProfile?.degree}
        bio={vet?.doctorProfile?.tags}
      />

      <View style={styles.cardHeader}>
        <Text style={styles.textHeader}>Availability</Text>
        <View style={styles.monthContainer}>
          <Ionicons name="calendar-outline" color={Colors.black} size={32} />
          <Text style={styles.monthText}>{format(new Date(), "MMMM")}</Text>
        </View>
      </View>
      <WeeklyCalendar onSelectDate={handleDateSelect} />

      {isFullyBooked ? (
        <View style={styles.timeSection}>
          <Text style={styles.timeText}>
            Sorry, your selected date is fully booked!
          </Text>
          <Text style={styles.timeSubText}>
            Next Availability on Fri, Nov 15
          </Text>
          <CommonButton
            title="See list"
            onPress={() => {}}
            backgroundColor={Colors.white}
            textColor={Colors.primary}
            bordered={true}
          />
        </View>
      ) : (
        <TimeSlotSelector
          morningSlots={availableSlots.filter(
            (slot) => parseInt(slot.split(":")[0]) < 12,
          )}
          eveningSlots={availableSlots.filter(
            (slot) => parseInt(slot.split(":")[0]) >= 12,
          )}
          onSelectTime={handleTimeSelect}
        />
      )}

      <CommonButton
        title="Continue"
        onPress={BookAppointment}
        style={styles.nextButton}
      />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 20,
  },
  textHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
  },
  monthContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  monthText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
  },
  timeSection: {
    marginHorizontal: 16,
    marginTop: 20,
    padding: 16,
    marginBottom: 150,
    borderRadius: 16,
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
    backgroundColor: Colors.white,
  },
  timeText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text,
  },
  timeSubText: {
    fontSize: 10,
    fontWeight: "500",
    color: Colors.subtitleColor,
  },
  nextButton: {
    marginHorizontal: 16,
  },
});

export default BookAppointment;
