import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import HeaderBar from "@/app/shared/components/HeaderBar";
import BottomNavBar from "@/app/shared/components/BottomNavBar";
import WeeklyCalendar from "../../../shared/components/WeeklyCalendarComponent";
import { Ionicons } from "@expo/vector-icons";
import FilterMenu from "@/app/shared/components/FilterMenu";
import CommonButton from "@/app/shared/components/CommonButton";
import { useState } from "react";
import { useRouter } from "expo-router";
import TaskModal from "../components/TaskModal";
import ReminderModal from "../components/ReminderModal";
import { ReminderCard, ReminderCardProps } from "@/app/shared/components/ReminderCard";
import { Colors } from "@/app/constants/Colors";

const FILTERS = [
  "All",
  "Meal",
  "Vitamin",
  "Pill",
  "Drops",
  "Vaccine",
  "Appointment",
  "Beauty",
  "Activity",
];

export default function ReminderScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0]);
  const task : ReminderCardProps[] = [
    {
      petName: "Tommy",
      treatment: "Rabies 1ml",
      dose: "1 dose",
      time: "9:00",
      task: "Pill"
    },
    {
      petName: "Tommy",
      treatment: "Rabies 1ml",
      dose: "1 dose",
      time: "9:00",
      task: "Meal"
    },
    {
      petName: "Tommy",
      treatment: "Rabies 1ml",
      dose: "1 dose",
      time: "9:00",
      task: "Activity"
    },
    {
      petName: "Tommy",
      treatment: "Rabies 1ml",
      dose: "1 dose",
      time: "9:00",
      task: "Drop"
    },
    {
      petName: "Tommy",
      treatment: "Rabies 1ml",
      dose: "1 dose",
      time: "9:00",
      task: "Beauty"
    },
  ]

  return (
    <View style={styles.container}>
      <HeaderBar
        title="Reminder"
        rightIcons={[
          {type: "ion", name: "search-outline", onPress: () => {}},
          {type: "ion", name: "calendar-outline", onPress: () => {}},
        ]}
      />

      <WeeklyCalendar/>

      {/* Tasks */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>Tasks</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconContainer}>
          <Ionicons
              name={"add-outline"}
              size={24}
              color={Colors.white}
            />
        </TouchableOpacity>
      </View>
      <FilterMenu
        filters={FILTERS}
        defaultSelected="All"
        onSelect={(value) => setSelectedFilter(value)}
      />
        {task.length === 0 ? (
          <>
            <View style={styles.icon}>
              <Ionicons name="calendar-number-outline" color={Colors.primary} size={100}/>
            </View>
            <Text style={styles.noRemindersText}>You don’t have any reminders yet. Add one to keep your pet’s on track!</Text>
            <CommonButton
              title="Add Reminder"
              onPress={() => setModalVisible(true)} 
              iconName='timer-outline'
              backgroundColor= {Colors.primary}
              style={{ marginBottom: 20, paddingVertical: 12, marginHorizontal: 90 }}
            />
          </>
        ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              {task.map((item, idx) => (
                <ReminderCard 
                  key={idx}
                  {...item}
                />
              ))} 
            </ScrollView>
        )}

      {/* <ReminderModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onEdit={() => console.log("Edit")}
        onPin={() => console.log("Pin")}
      /> */}

      <TaskModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
      <BottomNavBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: 20,
    paddingBottom: 100
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: Colors.primary,
  },
  icon: {
    alignItems: 'center',
    marginTop: 20,
  },
  noRemindersText: {
    textAlign: 'center',
    color: Colors.text,
    fontSize: 16,
    marginHorizontal: 40,
    marginTop: 10,
    fontWeight: '500',
    marginBottom: 20,
  },
});