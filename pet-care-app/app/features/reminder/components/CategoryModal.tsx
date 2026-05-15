import CommonButton from "@/app/shared/components/CommonButton";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import CategoryCard from "./CategoryCard";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function FrequencyModal({
  visible,
  onClose,
}: Props) {

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();

  return (
    <Modal visible={visible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.overlay}>
                <TouchableWithoutFeedback>
                    <View style={styles.modal}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.title}>Select Category</Text>
                            <Ionicons name="close-circle-outline" size={24} color="#3B4953" onPress={onClose}/>
                        </View>
                        <View>
                            <Text style={styles.foodLabel}>Food and vitamin</Text>
                            <View style={styles.foodCategories}>
                              <View style={styles.foodRow}>
                                <CategoryCard
                                    label="Meal"
                                    iconName="restaurant-outline"
                                    highlightColor="#F74E75"
                                    backgroundColor={selectedId === "meal" ? "#f3c7d0" : "#fff"}
                                    iconCircleColor={selectedId === "meal" ? "#F74E75" : "#F2F2F2"}
                                    onPress={() => setSelectedId("meal")}
                                />
                                <CategoryCard
                                    label="Vitamin"
                                    iconName="medkit-outline"
                                    backgroundColor={selectedId === "vitamin" ? "#f8d8cd" : "#fff"}
                                    iconCircleColor={selectedId === "vitamin" ? "#F77B4E" : "#F2F2F2"}
                                    onPress={() => setSelectedId("vitamin")}
                                />
                              </View>
                            </View>
                        </View>
                       
                        <View>
                          <Text style={styles.foodLabel}>Medical</Text>
                          <View style={styles.foodCategories}>
                            <View style={styles.foodRow}>
                              <CategoryCard
                                  label="Pills"
                                  iconName="flask-outline"
                                  highlightColor="#5A7863"
                                  backgroundColor={selectedId === "pills" ? "#EBF4DD" : "#fff"}
                                  iconCircleColor={selectedId === "pills" ? "#5A7863" : "#F2F2F2"}
                                  onPress={() => setSelectedId("pills")}
                              />
                              <CategoryCard
                                  label="Drops"
                                  iconName="water-outline"
                                  highlightColor="#5A7863"
                                  backgroundColor={selectedId === "drops" ? "#EBF4DD" : "#fff"}
                                  iconCircleColor={selectedId === "drops" ? "#5A7863" : "#F2F2F2"}
                                  onPress={() => setSelectedId("drops")}
                              />
                            </View>
                            <View style={styles.foodRow}>
                              <CategoryCard
                                  label="Vaccine"
                                  iconName="bandage-outline"
                                  highlightColor="#5A7863" 
                                  backgroundColor={selectedId === "vaccine" ? "#EBF4DD" : "#fff"}
                                  iconCircleColor={selectedId === "vaccine" ? "#5A7863" : "#F2F2F2"}
                                  onPress={() => setSelectedId("vaccine")}
                              />
                              <CategoryCard
                                  label="Appointment"
                                  iconName="calendar-outline"
                                  highlightColor="#5A7863"
                                  backgroundColor={selectedId === "appointment" ? "#EBF4DD" : "#fff"}
                                  iconCircleColor={selectedId === "appointment" ? "#5A7863" : "#F2F2F2"}
                                  onPress={() => setSelectedId("appointment")}
                              />
                            </View>
                          </View>
                      </View>

                      <View>
                          <Text style={styles.foodLabel}>Action</Text>
                          <View style={styles.foodCategories}>
                            <View style={styles.foodRow}>
                              <CategoryCard
                                  label="Babershop"
                                  iconName="cut-outline"
                                  highlightColor="#F74E75"
                                  backgroundColor={selectedId === "babershop" ? "#f3c7d0" : "#fff"}
                                  iconCircleColor={selectedId === "babershop" ? "#F74E75" : "#F2F2F2"}
                                  onPress={() => setSelectedId("babershop")}
                              />
                              <CategoryCard
                                  label="Activity"
                                  iconName="baseball-outline"
                                  backgroundColor={selectedId === "activity" ? "#f8d8cd" : "#fff"}
                                  iconCircleColor={selectedId === "activity" ? "#F77B4E" : "#F2F2F2"}
                                  onPress={() => setSelectedId("activity")}
                              />
                            </View>
                          </View>
                      </View>

                      <CommonButton
                        title="Next" 
                        onPress={() => router.push('/CategoryReminderScreen')}
                        backgroundColor='#5A7863'
                        style={{ marginTop: 20, paddingVertical: 12, borderRadius: 12 }}
                      />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    </Modal> 
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modal: {
    width: "100%",
    backgroundColor: "#FAFAFA",
    borderRadius: 16,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: "#3B4953",
  },
  foodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  foodLabel: { 
    fontSize: 16, 
    fontWeight: "500", 
    color: "#7B7B7B",
    marginBottom: 5,
  },
  foodCategories: {
    flexDirection: "column",
  },
});