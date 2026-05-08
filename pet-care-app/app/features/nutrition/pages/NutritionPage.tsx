import { Colors } from "@/app/constants/Colors";
import HeaderBar from "@/app/shared/components/HeaderBar";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PetProfileCard from "../../home/components/PetProfileCard";

export default function NutritionPage () {
    const [selected, setSelected] = useState<"mealLog" | "foodSuggestion">("mealLog");

    return (
        <View style={styles.container}>
            <HeaderBar title="Nutrition" />

            <View style={styles.btnSection}>
                <TouchableOpacity
                style={[
                    styles.button,
                    { backgroundColor: selected === "mealLog" ? Colors.primary : Colors.secondary },
                ]}
                onPress={() => setSelected("mealLog")}
                >
                    <Text style={styles.text}>Meal Log</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.button,
                        { backgroundColor: selected === "foodSuggestion" ? Colors.primary : Colors.secondary },
                    ]}
                    onPress={() => setSelected("foodSuggestion")}
                >
                    <Text style={styles.text}>Food Suggestion</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "#FAFAFA"
    },
    btnSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 16,
        marginTop: 20,
        backgroundColor: Colors.secondary,
        borderRadius: 14,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 14,
        alignItems: "center",
    },
    mealLog: {
        backgroundColor: Colors.secondary, 
    },
    foodSuggestion: {
        backgroundColor: Colors.primary, 
    },
    text: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
})