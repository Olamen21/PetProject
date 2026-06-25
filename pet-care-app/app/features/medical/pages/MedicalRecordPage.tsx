import AvatarSection from "@/app/shared/components/AvatarSection";
import { getPetList } from "@/app/shared/services/CommonApi";
import { Pet } from "@/app/shared/types/Pet";
import { useFocusEffect } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import MedicalChoose from "../components/MedicalChoose";
import LastestRecordComponent from "../components/LastestRecordComponent";
import BottomNavBar from "@/app/shared/components/BottomNavBar";
import HeaderBar from "@/app/shared/components/HeaderBar";

export default function MedicalRecordPage () {
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
        <View style={{flex: 1}}>
            <HeaderBar
                title="Medical Record"
            />
            <ScrollView style={{marginTop: 20,}} showsVerticalScrollIndicator={false}>
                <AvatarSection pets={pets} selectedPet={selectedPet} onSelectPet={setSelectedPet} />
                <MedicalChoose pets={pets} selectedPet={selectedPet} onSelectPet={setSelectedPet}/>
                <LastestRecordComponent />
            </ScrollView>
            <BottomNavBar />
        </View>
    )
}

