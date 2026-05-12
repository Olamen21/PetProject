import CommonButton from "@/app/shared/components/CommonButton";
import FilterMenu from "@/app/shared/components/FilterMenu";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LastestRecordComponent () {
    return (
        <View>
            <View style={styles.reminderCardHeader}>
                <Text style={styles.textReminder}>Latest records</Text>
                <TouchableOpacity style={styles.buttonViewAll}>
                    <Text style={styles.textViewAll}>View all</Text>
                    <Ionicons
                        name="chevron-forward-outline"
                        color="#5A7863"
                        size={20}
                    />
                </TouchableOpacity>
            </View>

            <FilterMenu
                filters={["All", "Prescription", "Vaccination", "Lab", "Examination"]}
                defaultSelected="All"
                onSelect={(value) => console.log("Selected:", value)}
            />

            <View style={styles.icon}>
                <Ionicons name="calendar-number-outline" color="#5A7863" size={100} />
            </View>
            <Text style={styles.noRemindersText}>
                You don’t have any records yet. Add your pet’s latest health updates here! 
            </Text>
            <CommonButton
                title="Add record"
                onPress={() => console.log("Book appointment")}
                iconName="add-outline"
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
    buttonViewAll: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    textViewAll: {
        color: "#5A7863",
        fontWeight: "500",
        fontSize: 12,
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