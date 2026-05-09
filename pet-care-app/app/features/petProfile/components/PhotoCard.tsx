import { View, Text, StyleSheet, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import CommonButton from "@/app/shared/components/CommonButton";

interface PhotoCardProps {
  photoUri?: string; 
  onAddPhoto: () => void;
}

export default function PhotoCard({ photoUri, onAddPhoto }: PhotoCardProps) {
  return (
    <View style={styles.photoCard}>
      {photoUri ? (
        <View style={styles.photoIconContainer}>
          <Image source={{ uri: photoUri }} style={styles.petPhoto} />
        </View>
      ) : (
        <>
          <View style={styles.photoIconContainer}>
            <View style={styles.photoIcon}>
              <Feather name="image" size={32} color="#5A7863" />
            </View>
            <View style={styles.photoBadge}>
              <Feather name="info" size={14} color="#5A7863" />
            </View>
          </View>

          <Text style={styles.photoText}>
            No photos yet. Add some and create an album!
          </Text>
          <CommonButton
            title="Add Photo"
            onPress={onAddPhoto}
            iconName="add"
            iconColor="#fff"
            backgroundColor="#5A7863"
            textColor="#fff"
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  photoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 32,
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  photoIconContainer: { position: "relative", marginBottom: 20 },
  petPhoto: {
    width: 120,
    height: 120,
    borderRadius: 8,
    resizeMode: "cover",
  },

  photoIcon: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: "#EEF2FF",
    borderWidth: 2,
    borderColor: "#5A7863",
    justifyContent: "center",
    alignItems: "center",
  },
  photoBadge: {
    position: "absolute",
    bottom: -6,
    right: -6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#5A7863",
    justifyContent: "center",
    alignItems: "center",
  },
  photoText: {
    fontSize: 14,
    color: "#4A5568",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
});
