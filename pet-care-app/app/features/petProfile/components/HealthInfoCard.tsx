import CommonSelectModal from "@/app/shared/components/CommonSelectModal";
import CommonSelector from "@/app/shared/components/CommonSelector";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Pet } from "../../../shared/types/Pet";
import AllergyInput from "./AllergyInput";

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
            <AllergyInput pet={pet} setPet={setPet}/>

           
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