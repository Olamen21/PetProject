import HeaderBar from "@/app/shared/components/HeaderBar";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native"
import StepIndicator from "../components/StepIndicator";
import { Colors } from "@/app/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import AppointmentInfo from "../components/AppointmentInfo";
import CommonButton from "@/app/shared/components/CommonButton";

const ConfirmPage = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <HeaderBar
                title="Confirm Info"
                leftIcons={[
                    {
                    type: "ion",
                    name: "chevron-back-outline",
                    onPress: () => router.push("/(tabs)/PatientInfoPage"),
                    },
                ]}
            />

            <StepIndicator currentStep={3} />

            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Image 
                        source={{ uri: "https://tse2.mm.bing.net/th/id/OIP.lcqX70iqkSZrE-H4Pqo_lAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" }}
                        style={styles.avatar}
                    />
                    <View style={styles.info}>
                        <View style={styles.petInfo}>
                            <Ionicons 
                                name="logo-octocat"
                                size={16}
                                color={Colors.subtitleColor}
                            />
                            <Text style={styles.petName}>Tommy</Text>
                        </View>
                        <Text style={styles.name}>Dr. Sara Fredo Jay</Text>
                        <Text style={styles.role}>DVM, Veterinary Dermatologist</Text>
                    </View>
                </View>

                <AppointmentInfo 
                    date="20 January, Thu"
                    time="11:00–11:30"
                />
            </View>

            <CommonButton 
                title="Confirm"
                onPress={() => router.push("/(tabs)/VetPage")}
                style={styles.button}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: "#FAFAFA", 
    },
    card: {
        backgroundColor: Colors.white,
        padding: 16,
        borderRadius: 12,
        shadowColor: Colors.black,
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        marginHorizontal: 10,
        marginTop: 10,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 16,
    },
    info: {
        flex: 1,
    },
    petInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
        gap: 4,
    },
    petName: {
        fontSize: 10,
        color: Colors.subtitleColor,
        fontWeight: "500",
    },
    name: {
        fontSize: 16,
        fontWeight: "500",
        color: Colors.text,
    },
    role: {
        fontSize: 12,
        color: Colors.subtitleColor,
        marginTop: 4,
    },
    button: {
        marginHorizontal: 10,
        marginTop:350,
    }
})

export default ConfirmPage;