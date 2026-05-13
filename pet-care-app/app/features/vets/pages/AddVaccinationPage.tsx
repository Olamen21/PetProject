import HeaderBar from "@/app/shared/components/HeaderBar";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import BasicInfoCard from "../components/BasicInfoCard";
import { Colors } from "@/app/constants/Colors";
import { useState } from "react";
import CommonToggle from "@/app/shared/components/CommonToggle";
import FrequencyCard from "../components/FrequencyCard";
import VaccineInfoCard from "../components/VaccineInfoCard";
import SelectDateVaccine from "../components/SelectDateVaccine";
import CommonButton from "@/app/shared/components/CommonButton";

export default function AddVaccinationPage() {
    const [description, setDescription] = useState("");
    
    return (
        <View style={styles.container}>
            <HeaderBar
                title="Add a Vaccine"
                leftIcons={[
                    {
                        type: "ion",
                        name: "chevron-back-outline",
                        onPress: () => router.push("/(tabs)/VaccinationPage"),
                    },
                ]} 
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <BasicInfoCard />
                <VaccineInfoCard />

                {/* Select Date of each Vaccine */}
                <View style={styles.reminderCardHeader}>
                    <Text style={styles.textReminder}>Select Date of each Vaccine</Text>
                </View>
                <SelectDateVaccine />

                <CommonToggle 
                    label="Add to reminder" 
                    initialValue={true} 
                    onToggle={(value) => console.log("Toggle changed:", value)} 
                />

                {/* Description */}
                <View style={styles.descripSection}>
                    <View style={{...styles.reminderCardHeader, marginBottom: 10}}>
                        <Text style={styles.textReminder}>Description</Text>
                    </View>
                    <TextInput
                        style={styles.textArea}
                        placeholder= "Don't forget to buy a new transportation box in petshop next to the clinic"
                        value={description}
                        onChangeText={setDescription}
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>

                {/* Frequency */}
                <View style={{...styles.reminderCardHeader, marginBottom: 10}}>
                    <Text style={styles.textReminder}>Frequency</Text>
                </View>
                <FrequencyCard />

                {/* Toggle */}
                <CommonToggle 
                    iconName="calendar-outline"
                    label="Time interval" 
                    initialValue={true} 
                    onToggle={(value) => console.log("Toggle changed:", value)} 
                />

                <CommonToggle 
                    iconName="pin-outline"
                    label="Pin to top" 
                    initialValue={true} 
                    onToggle={(value) => console.log("Toggle changed:", value)} 
                />

                <CommonToggle 
                    iconName="notifications-outline"
                    label="Notification" 
                    initialValue={true} 
                    onToggle={(value) => console.log("Toggle changed:", value)} 
                />

                <CommonButton 
                    title="Save"
                    onPress={() => {}}
                    style={{margin: 10}}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA",
        paddingBottom: 50,
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
    descripSection : {
        marginHorizontal: 10,
    },
    textArea: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        textAlignVertical: "top", 
        fontSize: 14,
        minHeight: 100,
        backgroundColor: Colors.white
    },

})