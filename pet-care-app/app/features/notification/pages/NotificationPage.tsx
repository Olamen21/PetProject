import { Colors } from "@/app/constants/Colors";
import FilterMenu from "@/app/shared/components/FilterMenu";
import HeaderBar from "@/app/shared/components/HeaderBar";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import NotificationCard, { NotificationCardProps } from "../components/NotificationCard";
import { Ionicons } from "@expo/vector-icons";

export default function NotificationPage() {
   const router = useRouter();
   const sections: { title: string; data: NotificationCardProps[] }[] = [
    {
        title: "Today",
        data: [
        { petName: "Janny", time: "18:50", message: "140 gr dry food at 7:00", category: "Nutrition" },
        { petName: "Janny", time: "19:00", message: "Appointment with vet tomorrow", category: "Medical Records", state: "Successful" },
        ],
    },
    {
        title: "Last 7 days",
        data: [
        { petName: "Janny", time: "18:50", message: "140 gr dry food at 7:00", category: "Nutrition", state: "Successful" },
        { petName: "Janny", time: "19:00", message: "Appointment with vet tomorrow", category: "Medical Records", state: "Successful" },
        { petName: "Janny", time: "19:00", message: "Appointment with vet tomorrow", category: "Medical Records", state: "Unsuccessful" },
        ],
    },
    {
        title: "Last 30 days",
        data: [
        { petName: "Janny", time: "18:50", message: "140 gr dry food at 7:00", category: "Nutrition", state: "Successful" },
        { petName: "Janny", time: "19:00", message: "Appointment with vet tomorrow", category: "Medical Records", state: "Successful" },
        ],
    },
    ];  

    return (
        <View style={styles.container}>
            <HeaderBar
                title="Notifications"
                leftIcons={[
                    {
                    type: "ion",
                    name: "chevron-back-outline",
                    onPress: () => router.push("/(tabs)/HomeScreen"),
                    },
                ]}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                {sections.length === 0 ? (
                    // Nếu không có dữ liệu
                    <View style={styles.contentSection}>
                        <Ionicons name="notifications-outline" size={200} color={Colors.primary}/>
                        <Text style={styles.text}>No Notification Yet</Text>
                    </View> 
                ) : (
                    <>
                        <FilterMenu
                            filters={["All Updates", "Medical Records", "Payment", "Vet & Appointment", "Nutrition"]}
                            defaultSelected="All Updates"
                            onSelect={(value) => console.log("Selected:", value)}
                        />
                        
                        {sections.map((section, index) => (
                            <View key={index}>
                                <View style={[styles.header, { marginBottom: 20 }]}>
                                <Text style={styles.textHeader}>{section.title}</Text>
                                </View>
                                {section.data.map((item, idx) => (
                                <NotificationCard key={idx} {...item} />
                                ))}
                            </View>
                        ))}
                    </>
                )}

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 120,
    },
    contentSection: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50%",
    },
    text: {
        fontSize: 16,
        fontWeight: "500",
        color: Colors.text
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        marginTop: 10,
    },
    textHeader: {
        fontSize: 18,
        fontWeight: "600",
        color: Colors.text,
    },
    textBtn: {
        color: Colors.primary,
        fontWeight: "500",
        fontSize: 12,
    },

})