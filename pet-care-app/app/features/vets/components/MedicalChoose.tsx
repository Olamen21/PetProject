import { Colors } from "@/app/constants/Colors";
import CommonButton from "@/app/shared/components/CommonButton";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pet } from "../../../shared/types/Pet";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MedicalChoose ({ pets, selectedPet, onSelectPet, }: {
  pets: Pet[];
  selectedPet: Pet | null;
   onSelectPet: (pet: Pet) => void;
 }) {
    
    return (
        <View>
            <View style={styles.reminderCardHeader}>
                <Text style={styles.textReminder}>Medical records</Text>
                <TouchableOpacity style={styles.buttonViewAll}>
                    <Text style={styles.textViewAll}>View all</Text>
                    <Ionicons
                        name="chevron-forward-outline"
                        color="#5A7863"
                        size={20}
                    />
                </TouchableOpacity>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
                <CommonButton
                    title="Vaccination"
                    onPress={() => router.push({
                        pathname: "/(tabs)/VaccinationPage",
                        params: {petId: selectedPet?.id}
                    })}
                    iconName="medkit-outline"
                    iconColor= {Colors.secondary}
                    backgroundColor= {Colors.white}
                    textColor= {Colors.text}
                    bordered={true}
                    borderColor="#F2F2F2"
                    borderWidth={2}
                    style={styles.btn}
                    textStyle={{fontSize: 11}}
                    iconSize={16}
                />
            </View>
            <View style={styles.buttonContainer}>
                <CommonButton
                    title="Prescriptions"
                    onPress={() => console.log("Prescriptions!")}
                    iconName="clipboard-outline"
                    iconColor= {Colors.secondary}
                    backgroundColor= {Colors.white}
                    textColor= {Colors.text}
                    bordered={true}
                    borderColor="#F2F2F2"
                    borderWidth={2}
                    style={styles.btn}
                    textStyle={{fontSize: 11}}
                    iconSize={16}
                />
            </View>
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
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        marginTop: 10,
    },
    btn: {
        flex: 1,
    }
})