import HeaderBar from "@/app/shared/components/HeaderBar";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native"
import StepIndicator from "../components/StepIndicator";
import VetCard from "../components/VetCard";
import { Colors } from "@/app/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import WeeklyCalendar from "@/app/shared/components/WeeklyCalendarComponent";
import TimeSlotSelector from "../components/TimeSlotSelector";
import CommonButton from "@/app/shared/components/CommonButton";
import { useState } from "react";

const BookAppointment = () => {
    const router = useRouter();
    const [isFullyBooked, setIsFullyBooked] = useState(false);

    return (
        <View style={styles.container}>
            <HeaderBar
                title="Appointment"
                leftIcons={[
                    {
                    type: "ion",
                    name: "chevron-back-outline",
                    onPress: () => router.push("/(tabs)/AppointmentPage"),
                    },
                ]}
            />
            <StepIndicator currentStep={1} />
            
            <VetCard 
                name="Dr. Sarah Johnson"
                role="Veterinarian"
                avatarUrl="https://tse4.mm.bing.net/th/id/OIP.zk6ljBq0PJHHSl6kgbrKVAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
                showOnlineStatus={false}
            />

            <View style={styles.cardHeader}>
                <Text style={styles.textHeader}>Availability</Text>
                <View style={styles.monthContainer}>
                    <Ionicons name="calendar-outline" color={Colors.black} size={32} />
                    <Text style={styles.monthText}>
                        {format(new Date(), "MMMM")} 
                    </Text>
                </View>
            </View>
            <WeeklyCalendar />
            
            {isFullyBooked ? (
               <View style={styles.timeSection}>
                    <Text style={styles.timeText}>Sorry, your selected date is fully booked!</Text>
                    <Text style={styles.timeSubText}>Next Availability on Fri, Nov 15</Text>
                    <CommonButton 
                        title="See list"
                        onPress={() => {}}
                        backgroundColor={Colors.white}
                        textColor={Colors.primary}
                        bordered={true}
                    />
                </View>
            ) : (
                <TimeSlotSelector />
            )}

            <CommonButton 
                title="Continue"
                onPress={() => router.push("/(tabs)/PatientInfoPage")}
                style={styles.nextButton}
            />

        </View>
    )
}

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
    }

})

export default BookAppointment;