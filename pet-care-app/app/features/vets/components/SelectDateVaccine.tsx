import CommonSelector from "@/app/shared/components/CommonSelector";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/app/constants/Colors";
import { useState } from "react";

export default function SelectDateVaccine () {
    const [date, setDate] = useState<Date>(new Date());
    const [show, setShow] = useState<boolean>(false);
    const [mode, setMode] = useState<"date" | "time">("date");

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
        <View>
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
        </View>
    )
}

const styles = StyleSheet.create({
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
    buttonAdd: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: Colors.primary,
        justifyContent: "center",
        height: 55,
    }, 
})