import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Colors } from "@/app/constants/Colors";
import ReviewCard from "../components/ReviewCard";
import CommonButton from "@/app/shared/components/CommonButton";
import { useFocusEffect } from "expo-router";
import { Vets } from "../types/Vets";
import {
  getAllReviewByVetId,
  getAllUser,
  getProfile,
  getVetById,
} from "../services/vetService";
import { Review } from "../types/Review";

const AppointmentPage = () => {
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const [vet, setVet] = useState<Vets | null>(null);
  const { vetId } = useLocalSearchParams<{ vetId: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  useFocusEffect(
    useCallback(() => {
      const fetchVetDetails = async () => {
        try {
          const data = await getVetById(vetId);
          setVet(data);
          const dataUser = await getAllUser();
          const dataReview = await getAllReviewByVetId(vetId);
          const reviewsWithUser = dataReview.map((review: Review) => {
            const user = dataUser.find((u: any) => u.id === review.user_id);
            return {
              ...review,
              user_name: user?.full_name || "Unknown",
              avatar_url: user?.avatar_url || "",
            };
          });

          setReviews(reviewsWithUser);
        } catch (error) {
          console.error("Error fetching vet details:", error);
        }
      };
      fetchVetDetails();
    }, [vetId]),
  );
  const calculateYears = (startDate: any) => {
    if (!startDate) return 0;
    const start = new Date(startDate);
    const now = new Date();
    const diffInMs = now.getTime() - start.getTime();
    const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(diffInYears);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Card */}
      <View style={styles.card}>
        <View style={styles.iconSection}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={Colors.text}
            style={{ alignSelf: "flex-start" }}
            onPress={() => router.replace("/(tabs)/VetPage")}
          />
          <TouchableOpacity onPress={() => setLiked(!liked)}>
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={24}
              color={liked ? "red" : Colors.text}
              style={{ alignSelf: "flex-end" }}
            />
          </TouchableOpacity>
        </View>
        <Image
          source={
            vet?.avatar_url
              ? { uri: vet.avatar_url }
              : require("../../../../assets/images/doctor_remove_background.png")
          }
          style={styles.avatar}
        />
        <Text style={styles.name}>{vet?.full_name}</Text>
        <Text style={styles.role}>{vet?.doctorProfile?.degree}</Text>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons
              name="briefcase-outline"
              size={20}
              color={Colors.primary}
            />
            <Text style={styles.statLabel}>Experience </Text>
            <Text style={styles.statText}>
              {calculateYears(vet?.doctorProfile?.experience_start_date)} years
            </Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="people-outline" size={20} color={Colors.primary} />
            <Text style={styles.statLabel}>Patients</Text>
            <Text style={styles.statText}>1200+</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="star-outline" size={20} color={Colors.primary} />
            <Text style={styles.statLabel}>Rating</Text>
            <Text style={styles.statText}>4.5/5</Text>
          </View>
        </View>
      </View>

      {/* About Doctor */}
      <View style={styles.aboutSection}>
        <Text style={styles.aboutTitle}>About Doctor</Text>
        <Text style={styles.aboutText}>
          {vet?.doctorProfile?.bio || "No biography available."}
        </Text>
      </View>

      {/* Last reviews */}
      <View style={styles.reviewsSection}>
        <Text style={styles.reviewsTitle}>Last Reviews</Text>
        {reviews.map((review) => (
          <React.Fragment key={review.id}>
            <ReviewCard
              avatar_url={review.avatar_url}
              user_name={review.user_name}
              rating={review.rating}
              created_at={new Date(review.created_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
              comment={review.comment}
            />
            <View style={styles.separator} />
          </React.Fragment>
        ))}
      </View>

      <CommonButton
        title="Book appointment"
        onPress={() =>
          router.push({
            pathname: "/(tabs)/BookAppointment",
            params: { vetId: vet?.id },
          })
        }
        style={styles.bookButton}
      />
    </ScrollView>
  );
};

export default AppointmentPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F9FF",
    marginTop: 30,
  },
  card: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    margin: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  iconSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  avatar: {
    width: 100,
    height: 150,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
  },
  role: {
    fontSize: 10,
    color: Colors.subtitleColor,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 12,
  },
  statItem: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 10,
    color: Colors.subtitleColor,
    marginTop: 4,
  },
  statText: {
    fontSize: 12,
    color: Colors.text,
    marginTop: 4,
  },
  aboutSection: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 15,
    marginBottom: 20,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: Colors.text,
  },
  aboutText: {
    fontSize: 12,
    color: Colors.subtitleColor,
    lineHeight: 20,
  },
  readMore: {
    fontSize: 12,
    color: Colors.primary,
    marginTop: 8,
    fontWeight: "600",
  },
  reviewsSection: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 15,
    marginBottom: 20,
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: Colors.text,
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 8,
  },
  bookButton: {
    marginHorizontal: 16,
    marginBottom: 50,
  },
});
