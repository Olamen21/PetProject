import PetProfileCard from "@/app/shared/components/PetProfileCard";
import { ScrollView, StyleSheet, View } from "react-native";
import MedicalChoose from "./MedicalChoose";
import LastestRecordComponent from "./LastestRecordComponent";

export default function MedicalRecordComponent () {
    return (
        <ScrollView style={{marginBottom: 100}} showsVerticalScrollIndicator={false}>
            <PetProfileCard name="Buddy" age="2 years" />
            <MedicalChoose />
            <LastestRecordComponent />
        </ScrollView>
    )
}

