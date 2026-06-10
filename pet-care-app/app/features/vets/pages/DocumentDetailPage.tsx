import HeaderBar from "@/app/shared/components/HeaderBar";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function DocumentDetailPage() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <HeaderBar
                title="Documents"
                leftIcons={[
                    {
                    type: "ion",
                    name: "chevron-back-outline",
                    onPress: () => router.push("/(tabs)/DocumentPage"),
                    },
                ]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA",
        marginBottom: 50,
    },
})