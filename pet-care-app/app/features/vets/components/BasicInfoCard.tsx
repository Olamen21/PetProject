import { Colors } from "@/app/constants/Colors";
import { Image, StyleSheet, Text, View } from "react-native";
import { InfoRow } from "./InfoRow";

export default function BasicInfoCard () {
    return (
        <View style={styles.card}>
            <View style={styles.column}>
                <Image
                    source={{ uri: "https://images.pexels.com/photos/19024664/pexels-photo-19024664.jpeg?cs=srgb&dl=pexels-csibeman-19024664.jpg&fm=jpg" }} 
                    style={styles.image}
                />
                <Text style={styles.name}>Tommy</Text>
            </View>

            {/* Thông tin */}
            <View style={styles.infoSection}>
                <View style={styles.row}>
                    <InfoRow icon="paw-outline" label="Golden" />
                    <InfoRow icon="calendar-outline" label="3 years old" />
                    <InfoRow icon="male-outline" label="Male" />
                </View>
               
                <View style={styles.row}>
                    <InfoRow icon="scale-outline" label="12 kg" />
                    <InfoRow icon="resize-outline" label="40 cm" />
                    <InfoRow icon="time-outline" label="3 mo. ago" />
                </View>

                <View style={styles.vaccinRow}>
                    <Text style={styles.text}>Vaccination: Up-to-date</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        margin: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: 64,
        height: 84,
        borderRadius: 60,
    },
    infoSection: {
        flexDirection: "column",
        justifyContent: "center",
    },
    name: {
        fontSize: 12,
        marginBottom: 6,
        color: Colors.primary
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 2,
    },
    column: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 2,
        gap: 5,
        marginRight: 12,
    },
    text: {
        marginLeft: 6,
        fontSize: 10,
        color: Colors.text,
    },
    vaccinRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,              
        borderWidth: 1,            
        borderColor: "#ccc",       
        borderRadius: 64,           
        backgroundColor: Colors.background,
        marginRight: 5,
        marginTop: 5,
    }
})