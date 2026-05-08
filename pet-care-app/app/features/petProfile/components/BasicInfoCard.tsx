import CommonSelectModal from "@/app/shared/components/CommonSelectModal";
import CommonSelector from "@/app/shared/components/CommonSelector";
import CommonTextInput from "@/app/shared/components/CommonTextInput";
import { StyleSheet, Text, View } from "react-native";
import { Pet } from "../types/Pet";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

interface BasicInfoCardProps {
    pet: Pet,
    setPet: (value: Pet) => void;
}

export default function BasicInfoCard({
    pet, 
    setPet,
} : BasicInfoCardProps) {

    const [showPicker, setShowPicker] = useState(false);
    const [showSpeciesModal, setShowSpeciesModal] = useState(false);

    const speciesList = [
        "Dog",
        "Cat",
        "Bird",
        "Fish",
        "Rabbit",
        "Hamster",
        "Turtle",
        "Other",
    ];
    const [showBreedModal, setShowBreedModal] = useState(false);

    const breeds = [
        "Golden Retriever",
        "Labrador Retriever",
        "Beagle",
        "Pug",
        "Cavalier King Charles Spaniel",
        "Shih Tzu",
        "French Bulldog",
    ];
    const [showGenderModal, setShowGenderModal] = useState(false);

    const genders = ["Male", "Female"];
    return (
        <View>
            <View style={styles.row}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>{"Pet's Name*"}</Text>
                    <CommonTextInput
                        icon="paw"
                        placeholder="Name of pet"
                        value={pet.name}
                        onChangeText={(text) => setPet({...pet, name: text})}
                        backgroundColor="#fff"
                        bordered
                    />
                    </View>
        
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Species*</Text>
                        <CommonSelector
                            value={pet.species}
                            placeholder="Select species"
                            onPress={() => setShowSpeciesModal(true)}
                        />
            
                        <CommonSelectModal
                            visible={showSpeciesModal}
                            onClose={() => setShowSpeciesModal(false)}
                            options={speciesList}
                            selected={pet.species}
                            onSelect={(text) => setPet({...pet, species: text})}
                            title="Select species"
                        />
                </View>
            </View>

            <View style={styles.row}>
                <View style={{ flex: 1 }}>
                <Text style={styles.label}>Breed*</Text>
                <CommonSelector
                    value={pet.breed}
                    placeholder="Select breed"
                    onPress={() => setShowBreedModal(true)}
                />
    
                <CommonSelectModal
                    visible={showBreedModal}
                    onClose={() => setShowBreedModal(false)}
                    options={breeds}
                    selected={pet.breed}
                    onSelect={(text) => setPet({...pet, breed: text})}
                    title="Select breed"
                />
                </View>
    
                <View style={{ flex: 1 }}>
                <Text style={styles.label}>Gender*</Text>
                <CommonSelector
                    value={pet.gender}
                    placeholder="Select gender"
                    onPress={() => setShowGenderModal(true)}
                />
    
                <CommonSelectModal
                    visible={showGenderModal}
                    onClose={() => setShowGenderModal(false)}
                    options={genders}
                    selected={pet.gender}
                    onSelect={(text) => setPet({...pet, gender: text as Pet['gender']})}
                    title="Select gender"
                />
                </View>
            </View>

            <View style={styles.row}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Height</Text>
                    <CommonTextInput
                        icon="resize-outline"
                        placeholder="Height of pet"
                        value={pet.height ? pet.height.toString() : ""}
                        onChangeText={(text) => setPet({ ...pet, height: isNaN(Number(text)) ? 0 : Number(text) })}
                        backgroundColor="#fff"
                        bordered
                    />
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Weight</Text>
                    <CommonTextInput
                        icon="scale-outline"
                        placeholder="Weight of pet"
                        value={pet.weight ? pet.weight.toString() : ""}
                        onChangeText={(text) => setPet({ ...pet, weight: isNaN(Number(text)) ? 0 : Number(text) })}
                        backgroundColor="#fff"
                        bordered
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={{ flex: 1 }}>
                <Text style={styles.label}>Date of Birth*</Text>
                <CommonSelector
                    value={pet.birthday ? new Date(pet.birthday).toDateString() : ""}
                    placeholder="Your pet's birthday"
                    onPress={() => setShowPicker(true)}
                />
    
                {showPicker && (
                    <DateTimePicker
                        value={pet.birthday ? new Date(pet.birthday) : new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, date) => {
                            setShowPicker(false);
                            if (date) setPet({...pet, birthday: date.toISOString()});
                        }}
                    />
                )}
                </View>
    
                <View style={{ flex: 1 }}>
                <Text style={styles.label}>Microchip ID</Text>
                <CommonTextInput
                    icon="hardware-chip-outline"
                    placeholder="000000000"
                    value={pet.microchipID ? pet.microchipID : ""}
                    onChangeText={(text) => setPet({...pet, microchipID: text})}
                    backgroundColor="#fff"
                    bordered
                />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
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