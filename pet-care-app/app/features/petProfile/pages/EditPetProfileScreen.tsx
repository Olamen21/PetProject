import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import CommonButton from "@/app/shared/components/CommonButton";
import PetAvatar from "../components/PetAvatar";
import CommonTextInput from "@/app/shared/components/CommonTextInput";
import React, { useState } from "react";
import { router } from "expo-router";
import CommonSelector from "@/app/shared/components/CommonSelector";
import CommonSelectModal from "@/app/shared/components/CommonSelectModal";
import DateTimePicker from "@react-native-community/datetimepicker";
import HeaderBar from "@/app/shared/components/HeaderBar";

export default function EditPetProfileScreen() {
  const [petName, setPetName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [microchipID, setMicrochipID] = useState("");
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const [species, setSpecies] = useState("");
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
  const [breed, setBreed] = useState("");
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
  const [gender, setGender] = useState("");
  const [showGenderModal, setShowGenderModal] = useState(false);

  const genders = ["Male", "Female"];

  return (
    <View style={styles.container}>
      <HeaderBar
        title="Edit pet's profile"
        leftIcons={[
          {
            type: "ion",
            name: "chevron-back-outline",
            onPress: () => router.push("/(tabs)/PetProfileScreen"),
          },
        ]}
      />
    
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <PetAvatar
          name=""
          editable
          onChangeAvatar={() => console.log("Chọn ảnh mới")}
        />

        <Text style={styles.sectionTitle}>Basic Information</Text>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>{"Pet's Name*"}</Text>
            <CommonTextInput
              icon="paw"
              placeholder="Name of pet"
              value={petName}
              onChangeText={setPetName}
              backgroundColor="#fff"
              bordered
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Species*</Text>
            <CommonSelector
              value={species}
              placeholder="Select species"
              onPress={() => setShowSpeciesModal(true)}
            />

            <CommonSelectModal
              visible={showSpeciesModal}
              onClose={() => setShowSpeciesModal(false)}
              options={speciesList}
              selected={species}
              onSelect={setSpecies}
              title="Select species"
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Breed*</Text>
            <CommonSelector
              value={breed}
              placeholder="Select breed"
              onPress={() => setShowBreedModal(true)}
            />

            <CommonSelectModal
              visible={showBreedModal}
              onClose={() => setShowBreedModal(false)}
              options={breeds}
              selected={breed}
              onSelect={setBreed}
              title="Select breed"
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Gender*</Text>
            <CommonSelector
              value={gender}
              placeholder="Select gender"
              onPress={() => setShowGenderModal(true)}
            />

            <CommonSelectModal
              visible={showGenderModal}
              onClose={() => setShowGenderModal(false)}
              options={genders}
              selected={gender}
              onSelect={setGender}
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
              value={height}
              onChangeText={setHeight}
              backgroundColor="#fff"
              bordered
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Weight</Text>
            <CommonTextInput
              icon="scale-outline"
              placeholder="Weight of pet"
              value={weight}
              onChangeText={setWeight}
              backgroundColor="#fff"
              bordered
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Date of Birth*</Text>
            <CommonSelector
              value={birthday ? birthday.toDateString() : ""}
              placeholder="Your pet's birthday"
              onPress={() => setShowPicker(true)}
            />

            {showPicker && (
              <DateTimePicker
                value={birthday || new Date()}
                mode="date"
                display="default"
                onChange={(event, date) => {
                  setShowPicker(false);
                  if (date) setBirthday(date);
                }}
              />
            )}
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Microchip ID</Text>
            <CommonTextInput
              icon="hardware-chip-outline"
              placeholder="000000000"
              value={microchipID}
              onChangeText={setMicrochipID}
              backgroundColor="#fff"
              bordered
            />
          </View>
        </View>

        <CommonButton
          title="Save Changes"
          onPress={() => {}}
          backgroundColor="#5A7863"
          textColor="#fff"
          style={{ marginTop: 24 }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { marginTop: 10 },
  container: { flex: 1, backgroundColor: "#FAFAFA", padding: 16 },
  scrollView: { flex: 1, marginTop: 10 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2D3748",
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    gap: 12, // khoảng cách giữa 2 ô
  },

  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4A5568",
    marginTop: 10,
    marginBottom: 10,
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#2D3748",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
});
