import CommonSelectModal from "@/app/shared/components/CommonSelectModal";
import CommonSelector from "@/app/shared/components/CommonSelector";
import CommonTextInput from "@/app/shared/components/CommonTextInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Pet } from "../../../shared/types/Pet";
import type { Breed } from "../types/Breed";

interface BasicInfoCardProps {
  pet: Pet;
  setPet: (value: Pet) => void;
  breeds: Breed[];
}

export default function BasicInfoCard({
  pet,
  setPet,
  breeds,
}: BasicInfoCardProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [showSpeciesModal, setShowSpeciesModal] = useState(false);

  const speciesList = [
    "Dog",
    "Cat",
  ];
  const [showBreedModal, setShowBreedModal] = useState(false);
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
            onChangeText={(text) => setPet({ ...pet, name: text })}
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
            onSelect={(text) => setPet({ ...pet, species: text })}
            title="Select species"
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Breed*</Text>
          <CommonSelector
            value={
              breeds.find((b) => b.id === pet.breed_id)?.name
            }
            placeholder="Select breed"
            onPress={() => setShowBreedModal(true)}
          />

          <CommonSelectModal
            visible={showBreedModal}
            onClose={() => setShowBreedModal(false)}
            options={breeds.map((b) => b.name)}
            selected={breeds.find((b) => b.id === pet.breed_id)?.name}
            onSelect={(name) => {
              const breed = breeds.find((b) => b.name === name);
              if (breed) {
                setPet({ ...pet, breed_id: breed.id });
              }
            }}
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
            onSelect={(text) =>
              setPet({ ...pet, gender: text as Pet["gender"] })
            }
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
            onChangeText={(text) =>
              setPet({ ...pet, height: isNaN(Number(text)) ? 0 : Number(text) })
            }
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
            onChangeText={(text) =>
              setPet({ ...pet, weight: isNaN(Number(text)) ? 0 : Number(text) })
            }
            backgroundColor="#fff"
            bordered
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Date of Birth*</Text>
          <CommonSelector
            value={
              pet.date_of_birth
                ? new Date(pet.date_of_birth).toLocaleDateString("en-GB") // dd/mm/yyyy
                : ""
            }
            placeholder="Your pet's birthday"
            onPress={() => setShowPicker(true)}
          />

          {showPicker && (
            <DateTimePicker
              value={
                pet.date_of_birth ? new Date(pet.date_of_birth) : new Date()
              }
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowPicker(false);
                if (date) setPet({ ...pet, date_of_birth: date.toISOString() });
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
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
});
