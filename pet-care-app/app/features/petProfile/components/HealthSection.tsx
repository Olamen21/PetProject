import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CommonButton from "@/app/shared/components/CommonButton";

export default function HealthSection() {
  const [activeRecordTab, setActiveRecordTab] = useState<"weight" | "height">("weight");

  return (
    <View style={{ marginTop: 24 }}>
      {/* Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Health Information</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View all</Text>
          <Ionicons name="chevron-forward-outline" size={16} color="#5A7863" />
        </TouchableOpacity>
      </View>

      {/* 2 khung icon */}
      <View style={styles.cardRow}>
        <View style={styles.cardBox}>
          <Ionicons name="clipboard-outline" size={28} color="#5A7863" />
          <Text style={styles.cardLabel}>Medical</Text>
        </View>
        <View style={styles.cardBox}>
          <Ionicons name="nutrition-outline" size={28} color="#5A7863" />
          <Text style={styles.cardLabel}>Nutrition</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[
            styles.tabItem,
            styles.tabLeft,
            activeRecordTab === "weight" ? styles.tabActive : styles.tabInactive,
          ]}
          onPress={() => setActiveRecordTab("weight")}
        >
          <Text
            style={[styles.tabText, activeRecordTab === "weight" && styles.tabTextActive]}
          >
            Weight Record
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabItem,
            styles.tabRight,
            activeRecordTab === "height" ? styles.tabActive : styles.tabInactive,
          ]}
          onPress={() => setActiveRecordTab("height")}
        >
          <Text
            style={[styles.tabText, activeRecordTab === "height" && styles.tabTextActive]}
          >
            Height Record
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.emptyState}>
              <Ionicons name="medkit" size={80} color="#5A7863" />
              <Text style={styles.emptyText}>
                {"You don't have any reminders yet. Add one to keep your pet on track!"}
              </Text>
              <CommonButton
                title="+ Add Reminder"
                onPress={() => {}}
                backgroundColor="#5A7863"
                textColor="#fff"
                style={{ marginTop: 10 }}
              />
            </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: "600", color: "#3B4953" },
  viewAllButton: { flexDirection: "row", alignItems: "center", gap: 4 },
  viewAllText: { color: "#5A7863", fontWeight: "500", fontSize: 12 },

  cardRow: {
    flexDirection: "row",
    gap: 12,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  cardBox: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardLabel: { marginTop: 8, fontWeight: "500", color: "#3B4953" },

  tabRow: { flexDirection: "row", marginHorizontal: 16 },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  tabLeft: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  tabRight: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  tabInactive: { backgroundColor: "#E6F0EA" },
  tabActive: { backgroundColor: "#5A7863" },
  tabText: { fontSize: 14, fontWeight: "600", color: "#5A7863" },
  tabTextActive: { color: "#fff" },
    emptyState: {
    alignItems: "center",
    marginHorizontal: 32,
    marginTop: 16,
    marginBottom: 24,
  },
  emptyText: {
    textAlign: "center",
    color: "#3B4953",
    fontSize: 15,
    marginTop: 12,
    fontWeight: "500",
  },
});
