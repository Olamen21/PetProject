import NutritionCard from "@/app/features/home/components/NutritionCard";
import AvatarSection from "@/app/shared/components/AvatarSection";
import BottomNavBar from "@/app/shared/components/BottomNavBar";
import CommonButton from "@/app/shared/components/CommonButton";
import FilterMenu from "@/app/shared/components/FilterMenu";
import { HeaderBar } from "@/app/shared/components/HeaderBar";
import { getPetList } from "@/app/shared/services/CommonApi";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Pet } from "../../../shared/types/Pet";
import { getProfile } from "../../user/services/userService";
import TipCard from "../components/TipCard";

export default function HomeScreen() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const data = await getPetList();
          setPets(data);
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
    }, [])
  );


  return (
    <View style={styles.container}>
      {/* Header Bar */}
      <HeaderBar
        logo={require("../../../../assets/images/logo.png")}
        rightIcons={[
          {
            type: "ion",
            name: "chatbubble-ellipses-outline",
            onPress: () => {},
            showDot: true,
          },
          { type: "ion", name: "notifications-outline", onPress: () => router.push("/(tabs)/NotificationPage"), },
          user?.avatar_url ?
          {
            type: "image",
            source: { uri: user.avatar_url },
            onPress: () => {},
          } : {
            type: "image",
            source: require("../../../../assets/images/avatarDefault.jpg"),
            onPress: () => {},
          }
        ]}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Pet Profile Card */}
        <AvatarSection pets={pets} selectedPet={selectedPet} onSelectPet={setSelectedPet} />

        {/* Today's Reminder */}
        <View style={styles.reminderCardHeader}>
          <Text style={styles.textReminder}>Today's Reminder</Text>
          <TouchableOpacity style={styles.buttonViewAll}>
            <Text style={styles.textViewAll}>View all</Text>
            <Ionicons
              name="chevron-forward-outline"
              color="#5A7863"
              size={20}
            />
          </TouchableOpacity>
        </View>
        <FilterMenu
          filters={["All", "Meal", "Vitamin", "Pill", "Drops", "Vaccine"]}
          defaultSelected="All"
          onSelect={(value) => console.log("Selected:", value)}
        />

        <View style={styles.icon}>
          <Ionicons name="calendar-number-outline" color="#5A7863" size={100} />
        </View>
        <Text style={styles.noRemindersText}>
          You don’t have any reminders yet. Add one to keep your pet’s on track!
        </Text>
        <CommonButton
          title="Add Reminder"
          onPress={() => console.log("Add Reminder")}
          iconName="timer-outline"
          backgroundColor="#5A7863"
          style={{
            marginBottom: 20,
            paddingVertical: 12,
            marginHorizontal: 90,
          }}
        />

        {/* Smart Nutrition */}
        <NutritionCard />

        {/* Tips */}
        {/* <View style={[styles.reminderCardHeader, { marginBottom: 20 }]}>
          <Text style={styles.textReminder}>Perfect tips</Text>
          <TouchableOpacity style={styles.buttonViewAll}>
            <Text style={styles.textViewAll}>View all</Text>
            <Ionicons
              name="chevron-forward-outline"
              color="#5A7863"
              size={20}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tipScrollView}
        >
          <TipCard />
          <TipCard />
          <TipCard />
        </ScrollView> */}
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 20,
  },
  reminderCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 20,
  },
  textReminder: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3B4953",
  },
  buttonViewAll: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  textViewAll: {
    color: "#5A7863",
    fontWeight: "500",
    fontSize: 12,
  },
  icon: {
    alignItems: "center",
    marginTop: 20,
  },
  noRemindersText: {
    textAlign: "center",
    color: "#3B4953",
    fontSize: 16,
    marginHorizontal: 40,
    marginTop: 10,
    fontWeight: "500",
    marginBottom: 20,
  },
  tipScrollView: {
    marginLeft: 10,
    marginBottom: 150,
  },
});
