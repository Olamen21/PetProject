import { Colors } from "@/app/constants/Colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type BtnProps = {
  selected: "Veterinarians" | "Medical records";
  onSelect: (value: "Veterinarians" | "Medical records") => void;
};

export default function BtnComponent({ selected, onSelect } : BtnProps) {
    return (
        <View style={styles.btnSection}>
            <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: selected === "Veterinarians" ? Colors.primary : Colors.secondary },
            ]}
                onPress={() => onSelect("Veterinarians")}
            >
                <Text style={styles.text}>Veterinarians</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.button,
                    { backgroundColor: selected === "Medical records" ? Colors.primary : Colors.secondary },
                ]}
                onPress={() => onSelect("Medical records")}
            >
                <Text style={styles.text}>Medical records</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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