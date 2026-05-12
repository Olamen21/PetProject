import { Colors } from "@/app/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function FrequencyCard () {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={{...styles.row, flex: 1}}>
                    <Ionicons 
                        name="calendar-outline"
                        size={24}
                    />
                    <Text>On specific dates</Text>
                </View>
                <Ionicons 
                    name="chevron-forward-outline"
                    size={24}
                />
            </View>
            <View style={{...styles.row, marginTop: 10}}>
                <View style={{...styles.row, flex: 1}}>
                    <Ionicons 
                        name="alarm-outline"
                        size={24}
                    />
                    <Text>1 times per day</Text>
                </View>
                <Ionicons 
                    name="chevron-forward-outline"
                    size={24}
                />
            </View>
            <View style={styles.timeCard}>
                <Text style={styles.textTime}>18:00</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: Colors.white,
        borderRadius: 16,
        borderColor: Colors.border,
        borderWidth: 1,
        marginHorizontal: 10,
    },
    row: {
        flexDirection: "row",
        gap: 12,
    },
    timeCard: {
        marginTop: 10,
        borderRadius: 12,
        alignSelf: "flex-start",
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: Colors.secondary,
    },
    textTime: {
        fontSize: 16,
        fontWeight: "500",
        color: Colors.text
    }
})