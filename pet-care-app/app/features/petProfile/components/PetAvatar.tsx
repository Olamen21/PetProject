import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { Colors } from "@/app/constants/Colors";

interface PetAvatarProps {
  name: string;
  avatarUri?: string | null;
  editable?: boolean;           
  onChangeAvatar?: () => void;  
  isSelected?: boolean;
  species?: string;
}

export default function PetAvatar({ 
  name, 
  avatarUri,
  species,
  editable = false, 
  onChangeAvatar,
  isSelected = true, 
}: PetAvatarProps) {
   const renderDefaultIcon = () => {
    if (species === "Dog") {
      return <MaterialCommunityIcons name="dog" size={40} color="#2D3748" />;
    }
    if (species === "Cat") {
      return <MaterialCommunityIcons name="cat" size={40} color="#2D3748" />;
    }
    return <MaterialCommunityIcons name="paw" size={40} color="#2D3748" />;
  };
  return (
    <View style={styles.avatarWrapper}>
      <View style={[
        styles.avatarCircle, 
        isSelected ? 
          {backgroundColor: Colors.primary} 
          : {backgroundColor : Colors.border}
          ]}>
        <View style={styles.avatarInner}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
          ) : (
            renderDefaultIcon()
          )}
        </View>

        {editable && (
          <TouchableOpacity style={styles.cameraButton} onPress={onChangeAvatar}>
            <Feather name="camera" size={16} color="#5A7863" />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.avatarLabel}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarWrapper: { alignItems: "center" },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    marginBottom: 8,
    position: "relative",
  },
  avatarInner: {
    width: "100%",
    height: "100%",
    borderRadius: 42,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatarImage: { width: "100%", height: "100%", resizeMode: "cover" },
  avatarLabel: { fontSize: 15, color: "#2D3748", fontWeight: "500" },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#EBF4DD",
    borderRadius: 16,
    padding: 6,
    borderWidth: 2,
    borderColor: "#5A7863",
  },
});
