import HeaderBar from "@/app/shared/components/HeaderBar";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import BasicInfoCard from "../components/BasicInfoCard";
import CommonTextInput from "@/app/shared/components/CommonTextInput";
import { Colors } from "@/app/constants/Colors";
import CommonSelector from "@/app/shared/components/CommonSelector";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import CommonToggle from "@/app/shared/components/CommonToggle";
import FrequencyCard from "../components/FrequencyCard";

export default function AddVaccinationPage() {
    const [date, setDate] = useState<Date>(new Date());
    const [show, setShow] = useState<boolean>(false);
    const [mode, setMode] = useState<"date" | "time">("date");
    const [description, setDescription] = useState("");

    const onChange = (event: any, selectedDate?: Date) => {
        setShow(false);
        if (!selectedDate) return;

        if (mode === "date") {
            const newDate = new Date(date);
            newDate.setFullYear(selectedDate.getFullYear());
            newDate.setMonth(selectedDate.getMonth());
            newDate.setDate(selectedDate.getDate());
            setDate(newDate);
        } else if (mode === "time") {
            const newDate = new Date(date);
            newDate.setHours(selectedDate.getHours());
            newDate.setMinutes(selectedDate.getMinutes());
            setDate(newDate);
        }
    };

    const showMode = (modeToShow: "date" | "time") => {
        setShow(true);
        setMode(modeToShow);
    };


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

            <View style={{ marginHorizontal: 10 }}>
                <Text style={styles.label}>{"Vaccine Name *"}</Text>
                <CommonTextInput
                    placeholder="e.g Rabies"
                    value={""}
                    onChangeText={() => {}}
                    backgroundColor= {Colors.white}
                    bordered
                />
            </View>

            <View style={styles.row}>
                <View style={styles.input}>
                    <Text style={styles.label}>{"Number *"}</Text>
                    <CommonTextInput
                        placeholder="4"
                        value={""}
                        onChangeText={() => {}}
                        backgroundColor= {Colors.white}
                        bordered
                    />
                </View>
                <View style={styles.input}>
                    <Text style={styles.label}>{"Dose *"}</Text>
                    <CommonTextInput
                        placeholder="1 ml"
                        value={""}
                        onChangeText={() => {}}
                        backgroundColor= {Colors.white}
                        bordered
                    />
                </View>
            </View>

            {/* Select Date of each Vaccine */}
            <View style={styles.reminderCardHeader}>
                <Text style={styles.textReminder}>Select Date of each Vaccine</Text>
            </View>
            <Text style={{...styles.label, marginLeft: 10}}>Dose 1</Text>
            <View style={styles.row}>
                <CommonSelector
                    value={date.toLocaleDateString("en-GB")}
                    placeholder="Select Date"
                    onPress={() => showMode("date")}
                />
                <CommonSelector
                    value={date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                    placeholder="Select Time"
                    onPress={() => showMode("time")}
                />
                {show && (
                    <DateTimePicker 
                        value={date}
                        mode= {mode}
                        onChange={onChange}
                        display="default"
                    />
                )}
                <TouchableOpacity 
                    style={styles.buttonAdd}
                    onPress={() => {}}
                >
                    <Ionicons
                        name="add-outline"
                        color= {Colors.white}
                        size={24}
                    />
                </TouchableOpacity>
                
            </View>

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
    input: {
    
        flex: 1,
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        color: "#4A5568",
        marginTop: 10,
        marginBottom: 10,
    },
    row: {
        flexDirection: "row",
        gap: 12,
        paddingHorizontal: 10,
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
        backgroundColor: Colors.primary,
        justifyContent: "center",
        height: 55,
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