import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CommonButton from "@/app/shared/components/CommonButton";
import { useState } from "react";
import FilterMenu from "@/app/shared/components/FilterMenu";

export default function TasksSection() {
  const [checkedTasks, setCheckedTasks] = useState<{ [key: string]: boolean }>(
    {},
  );

  const toggleTask = (taskKey: string) => {
    setCheckedTasks((prev) => ({ ...prev, [taskKey]: !prev[taskKey] }));
  };

  return (
    <View style={{ marginTop: 24 }}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}> {"Tommy's tasks for today"}</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View all</Text>
          <Ionicons name="chevron-forward-outline" size={16} color="#5A7863" />
        </TouchableOpacity>
      </View>

      <FilterMenu
        filters={["All", "Meal", "Vitamin", "Pill", "Drops", "Vaccine"]}
        defaultSelected="All"
        onSelect={(value) => console.log("Selected:", value)}
      />

      {/* Task List */}
      <View style={styles.taskSection}>
        <Text style={styles.taskGreeting}>Good Morning!</Text>

        <View style={styles.taskItem}>
          <Ionicons name="medkit-outline" size={20} color="#5A7863" />
          <View style={styles.taskInfo}>
            <Text style={styles.taskTitle}>Nestalin 220</Text>
            <Text style={styles.taskDetail}>09:45 - 1 capsule</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.checkbox,
              checkedTasks["nestalin"] && styles.checkboxChecked,
            ]}
            onPress={() => toggleTask("nestalin")}
          >
            {checkedTasks["nestalin"] && (
              <Ionicons name="checkmark" size={14} color="#fff" />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.taskItem}>
          <Ionicons name="cut-outline" size={20} color="#5A7863" />
          <View style={styles.taskInfo}>
            <Text style={styles.taskTitle}>Barbershop</Text>
            <Text style={styles.taskDetail}>11:30 - Appointment</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.checkbox,
              checkedTasks["barbershop"] && styles.checkboxChecked,
            ]}
            onPress={() => toggleTask("barbershop")}
          >
            {checkedTasks["barbershop"] && (
              <Ionicons name="checkmark" size={14} color="#fff" />
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.taskGreeting}>Good Afternoon!</Text>

        <View style={styles.taskItem}>
          <Ionicons name="fast-food-outline" size={20} color="#5A7863" />
          <View style={styles.taskInfo}>
            <Text style={styles.taskTitle}>Royale Canin</Text>
            <Text style={styles.taskDetail}>16:40 - 130 g</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.checkbox,
              checkedTasks["royale"] && styles.checkboxChecked,
            ]}
            onPress={() => toggleTask("royale")}
          >
            {checkedTasks["royale"] && (
              <Ionicons name="checkmark" size={14} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <CommonButton
        title="+ Add Reminder"
        onPress={() => {}}
        backgroundColor="#5A7863"
        textColor="#fff"
        style={{ marginTop: 20, marginHorizontal: 60 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
  },
  sectionTitle: { fontSize: 18, fontWeight: "600", color: "#3B4953" },
  viewAllButton: { flexDirection: "row", alignItems: "center", gap: 4 },
  viewAllText: { color: "#5A7863", fontWeight: "500", fontSize: 12 },

  filterRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 16,
    marginTop: 12,
  },
  filterItem: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#E6F0EA",
  },
  filterItemActive: { backgroundColor: "#5A7863" },
  filterText: { fontSize: 12, fontWeight: "500", color: "#3B4953" },
  filterTextActive: { color: "#fff" },

  taskSection: { marginHorizontal: 16, marginTop: 16 },
  taskGreeting: {
    fontSize: 14,
    fontWeight: "600",
    color: "#5A7863",
    marginBottom: 8,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  taskInfo: { flex: 1, marginLeft: 12 },
  taskTitle: { fontSize: 15, fontWeight: "600", color: "#2D3748" },
  taskDetail: { fontSize: 12, color: "#718096" },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#CBD5E0",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: { backgroundColor: "#5A7863", borderColor: "#5A7863" },
});
