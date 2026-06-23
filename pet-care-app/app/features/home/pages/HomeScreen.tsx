import BottomNavBar from "@/app/shared/components/BottomNavBar";
import CommonButton from "@/app/shared/components/CommonButton";
import CommonMessage from "@/app/shared/components/CommonMessage";
import HeaderBar from "@/app/shared/components/HeaderBar";
import { getPetList } from "@/app/shared/services/CommonApi";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AvatarSection from "../../../shared/components/AvatarSection";
import { Pet } from "../../../shared/types/Pet";
import InfoCards from "../components/InfoCards";
import PhotoCard from "../components/PhotoCard";
import { getAllBreed, getProfile, updatePet } from "../services/PetApi";
import { Breed } from "../types/Breed";

export default function HomeScreen() {
  const router = useRouter();
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [photoUri, setPhotoUri] = useState<string | undefined>(undefined);
  const [isNewAvatar, setIsNewAvatar] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [message, setMessage] = useState<{
    type: "error" | "success" | "warning" | "info";
    text: string;
  } | null>(null);
  const [breeds, setBreeds] = useState<Breed[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchPets = async () => {
        try {
          const data = await getPetList();
          const breeds = await getAllBreed();
          const dataUser = await getProfile();
          setUser(dataUser);
          setBreeds(breeds);
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

  const handleAddPhoto = async () => {
    if (!selectedPet) {
      setMessage({ type: "error", text: "Chưa chọn thú cưng để cập nhật!" });
      return;
    }

    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      setMessage({ type: "error", text: "Bạn cần cấp quyền truy cập ảnh!" });
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
          text: "Cập nhật hồ sơ thú cưng thành công!",
        });
        const updatedPets = await getPetList();
        setPets(updatedPets);
        const updatedPet = updatedPets.find((p) => p.id === selectedPet.id);
        if (updatedPet) setSelectedPet(updatedPet);
      } catch (error) {
        console.error(error);
        setMessage({ type: "error", text: "Có lỗi khi cập nhật thú cưng!" });
      }
    }
  };

  if (!selectedPet) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <HeaderBar
            logo={require("../../../../assets/images/logo.png")}
            rightIcons={[
              {
                type: "ion",
                name: "chatbubble-ellipses-outline",
                onPress: () => {},
                showDot: true,
              },
              {
                type: "ion",
                name: "notifications-outline",
                onPress: () => router.push("/(tabs)/NotificationPage"),
              },
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
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <AvatarSection
            pets={pets}
            selectedPet={selectedPet}
            onSelectPet={setSelectedPet}
          />
          {message && (
            <CommonMessage type={message.type} message={message.text} />
          )}
         

          <BottomNavBar />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderBar
          logo={require("../../../../assets/images/logo.png")}
          title={`${selectedPet.name}'s profile`}
          rightIcons={[
            {
              type: "ion",
              name: "chatbubble-ellipses-outline",
              onPress: () => {},
              showDot: true,
            },
            {
              type: "ion",
              name: "notifications-outline",
              onPress: () => router.push("/(tabs)/NotificationPage"),
            },
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
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
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
          photoUri={selectedPet.avatar_url ? selectedPet.avatar_url : photoUri}
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
          iconColor="#fff"
          backgroundColor="#5A7863"
          textColor="#fff"
          style={styles.button}
        />
       
      </ScrollView>

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },
  header: { marginTop: 20 },
  scrollView: { flex: 1 },
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
});
