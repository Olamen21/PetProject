import BottomNavBar from "@/app/shared/components/BottomNavBar";
import HeaderBar from "@/app/shared/components/HeaderBar";
import { StyleSheet, View } from "react-native";
import BtnComponent from "../components/BtnComponent"
import VeterinariansComponent from "../components/VeterinariansComponent";
import { useState } from "react";
import MedicalRecordComponent from "../components/MedicalRecordComponent";

export default function VetPage() {
    const [selected, setSelected] = useState<"Veterinarians" | "Medical records">("Veterinarians");

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <HeaderBar
                    title="Vets and medical records"
                    rightIcons={[{
                        type: "ion",
                        name: "search",
                        onPress: () => {},
                    }]}
                />
                <BtnComponent selected={selected}  onSelect={setSelected}/>
                {selected === "Veterinarians" && <VeterinariansComponent />}
                {selected === "Medical records" && <MedicalRecordComponent />}
            </View>
            <BottomNavBar />
        </View>
    )
}

const styles = StyleSheet.create({
   container: {
        flex: 1,
        backgroundColor: "#FAFAFA",
        marginBottom: 10,   
  },
})