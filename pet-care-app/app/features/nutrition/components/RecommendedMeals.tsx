import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SchedulePlan } from "../types/SchedulePlan";

type RecommendedMealsProps = {
  mealPlans: SchedulePlan[];
};
export default function RecommendedFoods({ mealPlans }: RecommendedMealsProps) {

    if (!mealPlans || mealPlans.length === 0) {
      return (
        <View style={styles.center}>
          <Text style={styles.loadingText}>Đang phân tích khẩu phần ăn...</Text>
        </View>
      );
    }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.mainTitle}>Gợi ý thực đơn theo bữa ăn</Text>

      {mealPlans.map((meal, mealIndex) => (
        <View key={mealIndex} style={styles.mealSection}>
          {/* Header của từng Bữa ăn */}
          <View style={styles.mealHeader}>
            <Text style={styles.mealTitle}>{meal.mealName}</Text>
            <Text style={styles.mealPercentage}>
              Tỷ trọng: {meal.percentage * 100}% calo ngày
            </Text>
          </View>

          {/* Danh sách các Thẻ món ăn (Cards) phù hợp cho bữa này */}
          <View style={styles.listContainer}>
            {meal.recommendedFoods.map((food, foodIndex) => (
              <View key={food.food_id || foodIndex} style={styles.card}>
                
                {/* Thứ hạng độ phù hợp */}
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>#{foodIndex + 1}</Text>
                </View>

                {/* Tên món và độ khớp */}
                <View style={styles.cardInfo}>
                  <Text style={styles.foodName} numberOfLines={1}>
                    {food.name}
                  </Text>
                  <Text style={styles.foodSimilarity}>
                    Độ tương đồng: {(food.similarity * 100).toFixed(0)}%
                  </Text>
                </View>

                {/* Khối lượng cần đong đếm cho bữa ăn */}
                <View style={styles.gramContainer}>
                  <Text style={styles.gramValue}>{food.calculatedGram}g </Text>
                  <Text style={styles.caloriesValue}>{food.caloriesInMeal} kcal </Text>
                </View>

              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, marginTop: 10 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  mainTitle: { fontSize: 20, fontWeight: "bold", color: "#1e272e", marginBottom: 16 },
  loadingText: { fontStyle: "italic", color: "#a5b1c2" },
  
  mealSection: { marginBottom: 24 },
  mealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#ff7675", // Màu nhấn định vị từng bữa
    paddingLeft: 8,
  },
  mealTitle: { fontSize: 16, fontWeight: "bold", color: "#2d3436" },
  mealPercentage: { fontSize: 12, color: "#778ca3", fontWeight: "500" },

  listContainer: { gap: 10 },
  card: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  badge: {
    backgroundColor: "#74b9ff",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 12,
  },
  badgeText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
  cardInfo: { flex: 1, marginRight: 8 },
  foodName: { fontSize: 15, fontWeight: "600", color: "#2c3e50", marginBottom: 2 },
  foodSimilarity: { fontSize: 11, color: "#95a5a6" },
  
  gramContainer: {
    alignItems: "flex-end",
    backgroundColor: "#fff5f5",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ffeaa7",
  },
  gramValue: { fontSize: 15, fontWeight: "bold", color: "#eb4d4b" },
  caloriesValue: { fontSize: 10, color: "#60a3bc", marginTop: 1 },
});