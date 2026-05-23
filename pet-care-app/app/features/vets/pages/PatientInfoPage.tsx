import HeaderBar from "@/app/shared/components/HeaderBar";
import { useFocusEffect, useRouter } from "expo-router";
import { StyleSheet, Text, TextInput, View } from "react-native"
import StepIndicator from "../components/StepIndicator";
import { Colors } from "@/app/constants/Colors";
import React, { useState } from "react";
import { Pet } from "@/app/shared/types/Pet";
import AvatarSection from "@/app/shared/components/AvatarSection";
import { getPetList } from "@/app/shared/services/CommonApi";
import CommonButton from "@/app/shared/components/CommonButton";

const PatientInfoPage = () => {
    const router = useRouter();
    const [pets, setPets] = useState<Pet[]>([]);
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
    const [text, setText] = useState("");
    const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

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
        }, []),
      );

    return (
        <View style={styles.container}>
            <HeaderBar
                title="Patient Info"
                leftIcons={[
                    {
                    type: "ion",
                    name: "chevron-back-outline",
                    onPress: () => router.push("/(tabs)/BookAppointment"),
                    },
                ]}
            />

            <StepIndicator currentStep={2} />

            {/* Select Pet */}
            <View style={styles.cardHeader}>
                <Text style={styles.textHeader}>Select your pet</Text>
            </View>
            <AvatarSection
                pets={pets}
                selectedPet={selectedPet}
                onSelectPet={setSelectedPet}
            />

            {/* Reason for Visit */}
            <View style={styles.cardHeader}>
                <Text style={styles.textHeader}>Reason for visit *</Text>
                <Text style={styles.wordCount}>{wordCount}/120 words</Text>
            </View>
            <TextInput
                style={styles.textInput}
                placeholder="Enter visit reason"
                multiline
                numberOfLines={4}
                value={text}
                onChangeText={setText}
            />

            <View style={styles.fileSection}>
                <Text style={styles.textFile}>Attach any related files here:</Text>
                <CommonButton 
                    title="Attach File"
                    onPress={() => console.log("File attached")}
                    iconName="attach-outline"
                    iconColor={Colors.primary}
                    backgroundColor={Colors.white}
                    textColor={Colors.primary}
                    bordered={true}
                />
            </View>

            <CommonButton 
                title="Continue"
                onPress={() => {}}
                backgroundColor={Colors.primary}
                textColor={Colors.white}
                style={{marginHorizontal: 10, marginTop: 150}}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: "#FAFAFA", 
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 10,
        marginTop: 20,
    },
    textHeader: {
        fontSize: 18,
        fontWeight: "600",
        color: Colors.text,
    },
    wordCount: {
        fontSize: 10,
        color: Colors.subtitleColor,
        fontWeight: "600",
    },
    textInput: {
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 8,
        padding: 10,
        minHeight: 80,
        textAlignVertical: "top",
        backgroundColor: Colors.white,  
        marginHorizontal: 10,
        marginTop: 10,
    },
    fileSection: {
        marginHorizontal: 10,
        marginTop: 10,
        gap: 10,
    },
    textFile: {
        fontSize: 12,
        fontWeight: "500",
    }
})

export default PatientInfoPage;