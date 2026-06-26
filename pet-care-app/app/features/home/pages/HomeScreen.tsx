import NutritionCard from "@/app/features/home/components/NutritionCard";
import AvatarSection from "@/app/shared/components/AvatarSection";
import BottomNavBar from "@/app/shared/components/BottomNavBar";
import CommonButton from "@/app/shared/components/CommonButton";
import { HeaderBar } from "@/app/shared/components/HeaderBar";
import { getPetList } from "@/app/shared/services/CommonApi";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Pet } from "../../../shared/types/Pet";
import { getProfile } from "../../user/services/userService";
import CommonMessage from "@/app/shared/components/CommonMessage";
import PhotoCard from "../components/PhotoCard";
import * as ImagePicker from "expo-image-picker";
import { getAllBreed, updatePet } from "../services/PetApi";
import InfoCards from "../components/InfoCards";
import { Breed } from "../types/Breed";
import { Colors } from "@/app/constants/Colors";

export default function HomeScreen() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const [message, setMessage] = useState<{
    type: "error" | "success" | "warning" | "info";
    text: string;
  } | null>(null);
  const [photoUri, setPhotoUri] = useState<string | undefined>(undefined);
  const [isNewAvatar, setIsNewAvatar] = useState(false);
  const [breeds, setBreeds] = useState<Breed[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const data = await getPetList();
          const breeds = await getAllBreed();
          setPets(data);
          setBreeds(breeds);
          if (data.length > 0) {
            setSelectedPet(data[0]);
          }
          const dataUser = await getProfile();
          setUser(dataUser);
        } catch (error) {
          console.error("Lỗi lấy dữ liệu:", error);
        }
      };
      fetchData();
    }, []),
  );

  const handleAddPhoto = async () => {
    if (!selectedPet) {
      setMessage({
        type: "error",
        text: "You haven't selected a pet to update yet!",
      });
      return;
    }

    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      setMessage({
        type: "error",
        text: "You need to grant permission to access the photos!",
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setPhotoUri(uri);
      setIsNewAvatar(true);

      const uriParts = uri.split(".");
      const fileExtension = uriParts[uriParts.length - 1].toLowerCase();

      const fileToUpload = {
        uri,
        name: `photo.${fileExtension}`,
        type: `image/${fileExtension === "jpg" ? "jpeg" : fileExtension}`,
      };

      const formData = new FormData();
      formData.append("file", fileToUpload as any);

      try {
        const response = await updatePet(selectedPet.id, formData);
        setIsNewAvatar(false);
        setSelectedPet(response.data);
        setMessage({
          type: "success",
          text: "Pet's profile updated successfully!",
        });
        const updatedPets = await getPetList();
        setPets(updatedPets);
        const updatedPet = updatedPets.find(
          (p: Pet) => p.id === selectedPet.id,
        );
        if (updatedPet) setSelectedPet(updatedPet);
      } catch (error) {
        console.error(error);
        setMessage({
          type: "error",
          text: "There was an error updating the pet!",
        });
      }
    }
  };

  if (!selectedPet || pets.length === 0) {
    return (
      <View style={styles.container}>
        <HeaderBar
          logo={require("../../../../assets/images/logo.png")}
          rightIcons={[]}
        />
        
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.emptyScrollContent}
        >
          {pets.length === 0 ? (
            <View style={styles.emptyCard}>
              {/* Vòng tròn trang trí tạo điểm nhấn thị giác */}
              <View style={styles.decoratorCircle} />
              
              <CommonMessage
                type="info"
                message="You don't have any pets yet. Please add a pet to see its profile."
              />
              
              <View style={{ width: '100%', marginTop: 10 }}>
                <CommonButton
                  title="Add a Pet"
                  onPress={() => router.push("/(tabs)/AddPetScreen")}
                  iconName="add-circle-outline"
                  iconColor={Colors.white}
                  backgroundColor={Colors.primary}
                  textColor={Colors.white}
                  style={styles.emptyButton}
                />
              </View>
            </View>
          ) : (
            <AvatarSection
              pets={pets}
              selectedPet={selectedPet}
              onSelectPet={setSelectedPet}
            />
          )}

          {message && (
            <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
              <CommonMessage type={message.type} message={message.text} />
            </View>
          )}
        </ScrollView>
        
        <BottomNavBar />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Bar */}
      <HeaderBar
        logo={require("../../../../assets/images/logo.png")}
        rightIcons={[
          user?.avatar_url
            ? {
                type: "image",
                source: { uri: user.avatar_url },
                onPress: () => {},
              }
            : {
                type: "image",
                source: require("../../../../assets/images/avatarDefault.jpg"),
                onPress: () => {},
              },
        ]}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Pet Profile Card */}
        <AvatarSection
          pets={pets}
          selectedPet={selectedPet}
          onSelectPet={setSelectedPet}
        />
        {message && (
          <CommonMessage type={message.type} message={message.text} />
        )}
        <PhotoCard
          onAddPhoto={handleAddPhoto}
          photoUri={selectedPet?.avatar_url ? selectedPet.avatar_url : photoUri}
        />
        <InfoCards pet={selectedPet} breeds={breeds} />
        <CommonButton
          title="Complete your pet's profile"
          onPress={() =>
            router.push({
              pathname: "/(tabs)/EditPetProfileScreen",
              params: { petId: selectedPet.id },
            })
          }
          iconName="clipboard-outline"
          iconColor={Colors.white}
          backgroundColor={Colors.primary}
          textColor={Colors.white}
          style={styles.button}
        />

        {/* Smart Nutrition */}
        <NutritionCard />
      </ScrollView>
      {/* Bottom Navigation Bar */}
      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  emptyScrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  decoratorCircle: {
    position: "absolute",
    top: -30,
    right: -30,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#FFF4ED", 
    opacity: 0.7,
  },
  emptyButton: {
    flexDirection: "row",
    paddingVertical: 14,
    borderRadius: 16, 
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 15,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
  },
});
