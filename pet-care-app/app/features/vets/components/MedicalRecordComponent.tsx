import AvatarSection from "@/app/shared/components/AvatarSection";
import { getPetList } from "@/app/shared/services/CommonApi";
import { useFocusEffect } from "expo-router";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Pet } from "../../../shared/types/Pet";
import LastestRecordComponent from "./LastestRecordComponent";
import MedicalChoose from "./MedicalChoose";

export default function MedicalRecordComponent () {
    const [pets, setPets] = useState<Pet[]>([]);
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

    useFocusEffect(
        React.useCallback(() => {
            const fetchPets = async () => {
            try {
                const data = await getPetList();
                setPets(data);
                if (data.length > 0) {
                setSelectedPet(data[0]);
                }
            } catch (error) {
                console.error("Không thể tải pets:", error);
            }
            };
            fetchPets();
        }, [])
    );

    return (
        <ScrollView style={{marginBottom: 100, marginTop: 20,}} showsVerticalScrollIndicator={false}>
            <AvatarSection pets={pets} selectedPet={selectedPet} onSelectPet={setSelectedPet} />
            <MedicalChoose pets={pets} selectedPet={selectedPet} onSelectPet={setSelectedPet}/>
            <LastestRecordComponent />
        </ScrollView>
    )
}

