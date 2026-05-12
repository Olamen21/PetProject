import NutritionCard from "@/app/features/home/components/NutritionCard";
import BottomNavBar from "@/app/shared/components/BottomNavBar";
import CommonButton from "@/app/shared/components/CommonButton";
import FilterMenu from "@/app/shared/components/FilterMenu";
import { HeaderBar } from "@/app/shared/components/HeaderBar";
import PetProfileCard from "@/app/shared/components/PetProfileCard";
import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TipCard from "../components/TipCard";

export default function HomeScreen() {
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
          { type: "ion", name: "notifications-outline", onPress: () => {} },
          {
            type: "image",
            source: require("../../../../assets/images/avatarDefault.jpg"),
            onPress: () => {},
          },
        ]}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Pet Profile Card */}
        <PetProfileCard name="Buddy" age="2 years" />

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <CommonButton
            title="Emergency"
            onPress={() => console.log("Emergency!")}
            iconName="medkit-outline"
            iconColor="#90AB8B"
            backgroundColor="#fff"
            textColor="#3B4953"
            bordered={true}
            borderColor="#F2F2F2"
            borderWidth={2}
          />
          <CommonButton
            title="Add reminder"
            onPress={() => console.log("Add reminder!")}
            iconName="calendar-outline"
            iconColor="#90AB8B"
            backgroundColor="#fff"
            textColor="#3B4953"
            bordered={true}
            borderColor="#F2F2F2"
            borderWidth={2}
          />
        </View>
        <CommonButton
          title="Calorie calculator"
          onPress={() => console.log("Calorie calculator")}
          iconName="stats-chart-outline"
          iconColor="#90AB8B"
          backgroundColor="#fff"
          textColor="#3B4953"
          style={{ margin: 10 }}
          bordered={true}
          borderColor="#F2F2F2"
          borderWidth={2}
        />

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
        <View style={[styles.reminderCardHeader, { marginBottom: 20 }]}>
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
        </ScrollView>
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
