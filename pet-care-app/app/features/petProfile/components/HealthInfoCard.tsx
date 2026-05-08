import CommonSelectModal from "@/app/shared/components/CommonSelectModal";
import CommonSelector from "@/app/shared/components/CommonSelector";
import { StyleSheet, Text, View } from "react-native";
import { Pet } from "../types/Pet";
import { useState } from "react";

interface HealthInfoCardProps {
    pet: Pet,
    setPet: (value: Pet) => void;
}

export default function HealthInfoCard({
    pet,
    setPet,
} : HealthInfoCardProps) {

    const [showNeuteredModel, setShowNeuteredModal] = useState(false);
    const [showAllergiesModel, setShowAllergiesModal] = useState(false);
    const neuteredList = ["Yes", "No"];
    const allergiesList: string[] = [
        "Chicken",
        "Beef",
        "Dairy",
        "Eggs",
        "Fish",
        "Grains (Wheat, Corn, Rice)",
        "Soy",
        "Lamb",
        "Pork",
        "Peanuts",
        "Shellfish",
        "Other"
    ];


    return (
        <View>
            <View style={styles.column}>
                <Text style={styles.label}>Is your pet spayed/neutered?</Text>
                <CommonSelector
                    value={pet.neutered ? "Yes" : "No"}
                    onPress={() => setShowNeuteredModal(true)}
                />
    
                <CommonSelectModal
                    visible={showNeuteredModel}
                    onClose={() => setShowNeuteredModal(false)}
                    options={neuteredList}
                    selected={pet.neutered ? "Yes" : "No"}
                    onSelect={(text) => setPet({ ...pet, neutered: text === "Yes" })}
                />
            </View>

            <View style={styles.column}>
                <Text style={styles.label}>Allergies</Text>
                <CommonSelector
                    value={pet.allergies ? pet.allergies : ""}
                    onPress={() => setShowAllergiesModal(true)}
                />
    
                <CommonSelectModal
                    visible={showAllergiesModel}
                    onClose={() => setShowAllergiesModal(false)}
                    options={allergiesList}
                    selected={pet.allergies}
                    onSelect={(text) => setPet({ ...pet, allergies: text})}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    column: {
        flexDirection: "column",
        gap: 12, 
    },

    label: {
        fontSize: 16,
        fontWeight: "500",
        color: "#4A5568",
        marginTop: 10,
        marginBottom: 10,
    },
})