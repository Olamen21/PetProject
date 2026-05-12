import CommonButton from "@/app/shared/components/CommonButton";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function VeterinariansComponent() {
    return (
        <View>
            <View style={styles.reminderCardHeader}>
            <Text style={styles.textReminder}>Upcoming appointments</Text>
            </View>
            <View style={styles.icon}>
                <Ionicons name="calendar-number-outline" color="#5A7863" size={100} />
            </View>
            <Text style={styles.noRemindersText}>
                You don’t have any appointments yet. Book a vet call to keep your pet on track
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
        </View>
    )
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
})