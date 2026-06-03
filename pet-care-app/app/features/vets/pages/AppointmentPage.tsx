import React, { useCallback, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Colors } from "@/app/constants/Colors";
import ReviewCard from "../components/ReviewCard";
import CommonButton from "@/app/shared/components/CommonButton";
import {useFocusEffect } from "expo-router";
import { Vets } from "../types/Vets";
import { getProfile, getVetById } from "../services/vetService";

const AppointmentPage = () => {
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const [vet, setVet] = useState<Vets | null>(null);
  const { vetId } = useLocalSearchParams<{ vetId: string }>();
  useFocusEffect(
    useCallback(() => {
      const fetchVetDetails = async () => {
        try {
          const data = await getVetById(vetId);
          setVet(data);
          console.log("Fetched vet details:", vetId);
        } catch (error) {
          console.error("Error fetching vet details:", error);
        }
      };
      fetchVetDetails();
    }, [vetId])
  );
   const calculateYears = (startDate:any)  => {
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
          source={vet?.avatar_url ? { uri: vet.avatar_url } : require("../../../../assets/images/doctor_remove_background.png")}
          style={styles.avatar}
        />
        <Text style={styles.name}>{vet?.full_name}</Text>
        <Text style={styles.role}>{vet?.doctorProfile?.degree}</Text>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="briefcase-outline" size={20} color={Colors.primary} />
            <Text style={styles.statLabel}>Experience </Text>
            <Text style={styles.statText}>{calculateYears(vet?.doctorProfile?.experience_start_date)} years</Text>
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
        <ReviewCard
          avatarUrl="https://th.bing.com/th/id/R.d82520f2cf1d9fda0d05b093c7bc446f?rik=xHnP2sdh5yZRjQ&riu=http%3a%2f%2f3.bp.blogspot.com%2f-GnN4nNKuaIU%2fUu54UxQg3eI%2fAAAAAAAAF1k%2faqwCXjVsMd0%2fs1600%2fMaria%2bAleksandrovna%2bKostikova.jpg&ehk=5tzt3F%2bJvu786T4HQrl1Dq42fHCm68xw98XSd6ZwR7k%3d&risl=&pid=ImgRaw&r=0"
          name="Courtney Henry"
          rating={4}
          date="02 Oct, 2025"
          review="Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco exercitation. Ullamco tempor adipisicing et voluptate duis sit esse aliqua."
        />
        <View style={styles.separator} />
        <ReviewCard
          avatarUrl="https://th.bing.com/th/id/R.d82520f2cf1d9fda0d05b093c7bc446f?rik=xHnP2sdh5yZRjQ&riu=http%3a%2f%2f3.bp.blogspot.com%2f-GnN4nNKuaIU%2fUu54UxQg3eI%2fAAAAAAAAF1k%2faqwCXjVsMd0%2fs1600%2fMaria%2bAleksandrovna%2bKostikova.jpg&ehk=5tzt3F%2bJvu786T4HQrl1Dq42fHCm68xw98XSd6ZwR7k%3d&risl=&pid=ImgRaw&r=0"
          name="Courtney Henry"
          rating={4}
          date="02 Oct, 2025"
          review="Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco exercitation. Ullamco tempor adipisicing et voluptate duis sit esse aliqua."
        />
        <View style={styles.separator} />
        <ReviewCard
          avatarUrl="https://th.bing.com/th/id/R.d82520f2cf1d9fda0d05b093c7bc446f?rik=xHnP2sdh5yZRjQ&riu=http%3a%2f%2f3.bp.blogspot.com%2f-GnN4nNKuaIU%2fUu54UxQg3eI%2fAAAAAAAAF1k%2faqwCXjVsMd0%2fs1600%2fMaria%2bAleksandrovna%2bKostikova.jpg&ehk=5tzt3F%2bJvu786T4HQrl1Dq42fHCm68xw98XSd6ZwR7k%3d&risl=&pid=ImgRaw&r=0"
          name="Courtney Henry"
          rating={4}
          date="02 Oct, 2025"
          review="Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco exercitation. Ullamco tempor adipisicing et voluptate duis sit esse aliqua."
        />

      </View>

      <CommonButton 
        title="Book appointment"
        onPress={() => router.push({ pathname: "/(tabs)/BookAppointment", params: { vetId: vet?.id } })}
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
    width: "100%"
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
  }

});
