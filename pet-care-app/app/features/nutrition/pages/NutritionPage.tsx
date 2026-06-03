import { Colors } from "@/app/constants/Colors";
import AvatarSection from "@/app/shared/components/AvatarSection";
import HeaderBar from "@/app/shared/components/HeaderBar";
import { getPetList } from "@/app/shared/services/CommonApi";
import { Pet } from "@/app/shared/types/Pet";
import { useFocusEffect } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import InfoPet from "../components/InfoPet";
import BottomNavBar from "@/app/shared/components/BottomNavBar";
import ActivitySelector from "../components/ActivitySelector";
import NutritionRecommendation from "../components/NutritionRecommendation";
import { buildPetNeedVector, calculateMER, PetCondition } from "../utils/NutritionUtils";
import RecommendedFoods from "../components/RecommendedMeals";
import { SchedulePlan } from "../types/SchedulePlan";
import { recommendFoodsForMeals, loadFoodVectors } from "../utils/FoodUtils"

export default function NutritionPage () {
    const [pets, setPets] = useState<Pet[]>([]);
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
    const [showActivityModal, setShowActivityModal] = useState(false);
    const [activity, setActivity] = useState<string | undefined>(undefined);
    const [showHealthConditionModal, setShowHealthConditionModal] = useState(false);
    const [healthCondition, setHealthCondition] = useState<PetCondition | undefined>(undefined);
    const [mealPlans, setMealPlans] = useState<SchedulePlan[]>([]);
    
    
    const activityList = [
        "Indoor/Inactive",
        "Neutered adult",
        "Intact adult",
        "Overweight/Obesity",
        "Working/ Very active",
        "Growth < 4 months",
        "Growth >= 4 months",
        "Gestation",
    ];

    const healthConditionList: PetCondition[] = [
        "normal",
        "overweight",
        "underweight",
    ];


    useFocusEffect(
        React.useCallback(() => {
          const fetchPets = async () => {
            try {
              const data = await getPetList();
              setPets(data);
              if (data.length > 0) {
                setSelectedPet(data[0]);
              }
            } catch (error) {
              console.error("Không thể tải pets:", error);
            }
          };
          fetchPets();
        }, []),
    );

    useFocusEffect(
    React.useCallback(() => {
        async function fetchMealPlans() {
            // 1. Kiểm tra điều kiện đầu vào
            if (!selectedPet || !activity || !healthCondition) return; 

            try {
                // 2. Load toàn bộ vectors món ăn thô từ file JSON/Database
                const foodVectors = await loadFoodVectors();

                // 3. Tính toán nhu cầu năng lượng (MER) và tạo Vector mục tiêu cả ngày của thú cưng
                const merAvg = calculateMER(selectedPet.weight, selectedPet.species, activity);
                const petNeedVectorRaw = buildPetNeedVector(merAvg, healthCondition); // [Calories, Protein, Fat, Carb]

                // 4. Gọi hàm service đã tối ưu để phân tách bữa ăn và tính số gram
                const plans = recommendFoodsForMeals(
                    petNeedVectorRaw, 
                    foodVectors, 
                    selectedPet.species
                );

                // 5. Cập nhật kết quả vào State để giao diện hiển thị
                setMealPlans(plans); 
            } catch (error) {
                console.error("Lỗi khi tính toán thực đơn theo bữa:", error);
            }
            }

            fetchMealPlans();
        }, [selectedPet, activity, healthCondition])
    );


    return (
        <View style={styles.container}>
            <HeaderBar title="Nutrition" />

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                <AvatarSection
                    pets={pets}
                    selectedPet={selectedPet}
                    onSelectPet={setSelectedPet}
                />

                {selectedPet && <InfoPet pet={selectedPet} />}

                <View style={styles.cardHeader}>
                    <Text style={styles.textCard}>{selectedPet?.name}'s Analysis</Text>
                </View>

                <ActivitySelector
                    activity={activity}
                    setActivity={setActivity}
                    showModal={showActivityModal}
                    setShowModal={setShowActivityModal}
                    activityList={activityList}
                    healthCondition={healthCondition}
                    setHealthCondition={setHealthCondition}
                    showHealthConditionModal={showHealthConditionModal}
                    setShowHealthConditionModal={setShowHealthConditionModal}
                    healthConditionList={healthConditionList}
                />

                {selectedPet && activity && healthCondition && (
                    <>
                        {/* Hiển thị chế độ dinh dưỡng */}
                        <NutritionRecommendation
                            key={`${activity}-${healthCondition}`}
                            pet={selectedPet}
                            activity={activity}
                            healthCondition={healthCondition}
                            calculateMER={calculateMER}
                            buildPetNeedVector={buildPetNeedVector}
                        />

                        <RecommendedFoods mealPlans={mealPlans} />

                    </>
                )}

            </ScrollView>

            <BottomNavBar />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "#FAFAFA"
    },
    header: { marginTop: 20 },
    scrollView: { flex: 1 , marginBottom: 100},
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 10,
        marginTop: 20,
    },
    textCard: {
        fontSize: 18,
        fontWeight: "600",
        color: Colors.text,
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        color: "#4A5568",
        marginTop: 10,
        marginBottom: 10,
    },
    
})