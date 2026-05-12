import HeaderBar from "@/app/shared/components/HeaderBar";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BasicInfoCard from "../components/BasicInfoCard";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/app/constants/Colors";
import { MedicalButton } from "../components/MedicalButton";
import { useState } from "react";
import { ReminderCard } from "@/app/shared/components/ReminderCard";
import { VaccinationScheduleCard } from "../components/VaccinationScheduleCard";

export default function Vaccination () {
    const [selected, setSelected] = useState<string>("Vaccination");

    return (
        <View style={styles.container}>
            <HeaderBar
                title="Vaccination"
                leftIcons={[
                    {
                        type: "ion",
                        name: "chevron-back-outline",
                        onPress: () => router.push("/(tabs)/VetPage"),
                    },
                ]}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <BasicInfoCard />

                {/* Medical record */}
                <View style={styles.reminderCardHeader}>
                    <Text style={styles.textReminder}>Medical records</Text>
                    <TouchableOpacity 
                        style={styles.buttonAdd}
                        onPress={() => {
                            if(selected === "Vaccination") {
                                router.push("/(tabs)/AddVaccinationPage")
                            }
                        }}
                    >
                        <Ionicons
                            name="add-outline"
                            color= {Colors.white}
                            size={24}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                    <MedicalButton 
                        icon="medkit-outline" 
                        label="Vaccination" 
                        selected={selected === "Vaccination"}
                        onPress={() => setSelected("Vaccination")}
                    />
                    <MedicalButton 
                        icon="clipboard-outline" 
                        label="Prescriptions"
                        selected={selected === "Prescriptions"}
                        onPress={() => setSelected("Prescriptions")} 
                    />
                    <MedicalButton 
                        icon="chatbox-outline" 
                        label="Consultations" 
                        selected={selected === "Consultations"}
                        onPress={() => setSelected("Consultations")}
                    />
                </View>

                {/* Upcoming vaccine*/}
                <View style={styles.reminderCardHeader}>
                    <Text style={styles.textReminder}>Upcoming Vaccine</Text>
                </View>
                <ReminderCard
                    petName="Tommy"
                    treatment="Rabies 1ml"
                    dose="1 dose"
                    time="9:00"
                />

                {/* Ongoing vaccine */}
                <View style={styles.reminderCardHeader}>
                    <Text style={styles.textReminder}>Ongoing Vaccine</Text>
                </View>
                <VaccinationScheduleCard
                    title="Rabies 1ml"
                    subtitle="Primary course"
                    nextDose="Sep 28, 6:00"
                    doses={[
                        { label: "Dose 1:", date: "Aug 15, 2025", status: "done" },
                        { label: "Dose 2:", date: "Sep 15, 2025", status: "done" },
                        { label: "Dose 3:", date: "Oct 15, 2025", time: "6:00", status: "upcoming" },
                    ]}
                    onChangeSchedule={() => console.log("Change schedule pressed")}
                />

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA",
        marginBottom: 10,   
    },
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
    buttonAdd: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: Colors.primary
    }
})