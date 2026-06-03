import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/app/constants/Colors";

type AnalysisCardProps = {
  weight: number;
  species: string;
  activity: string;
  calculateMER: (
    weightKg: number,
    species: string,
    activity: string
  ) => { merMin: number; merMax: number; merAvg: number };
};

const AnalysisCard: React.FC<AnalysisCardProps> = ({
  weight,
  species,
  activity,
  calculateMER,
}) => {
  const merAvg = calculateMER(weight, species, activity).merAvg;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Maintenance Energy Requirement</Text>

      <View style={styles.chartContainer}>
          {/* MER ở giữa vòng tròn */}
          <View style={styles.centerText}>
            <Text style={styles.merText}>{merAvg.toFixed(0)}</Text>
            <Text style={styles.unitText}>kcal</Text>
          </View>
      </View>
    </View>
  );
};

export default AnalysisCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 10,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text,
    marginBottom: 5,
  },
  divider: {
    borderBottomColor: "#ccc",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  textTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.subtitleColor,
    flex: 1,
  },
  text: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.text,
    fontWeight: "500",
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  centerText: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  merText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  unitText: {
    fontSize: 14,
    color: "#666",
  },
});
