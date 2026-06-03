import { Colors } from "@/app/constants/Colors";
import { Pet } from "@/app/shared/types/Pet";
import { StyleSheet, Text, View } from "react-native";
import PieChart from "react-native-pie-chart";

type NutritionRecommendationProps = {
    pet: Pet;
    activity: string;
    healthCondition?: "normal" | "overweight" | "underweight";
    calculateMER: (weight: number, species: string, activity: string) => number;
    buildPetNeedVector: (mer: number, condition: "normal" | "overweight" | "underweight") => number[];
}

export default function NutritionRecommendation({ 
    pet, 
    activity, 
    healthCondition = "normal",
    calculateMER, 
    buildPetNeedVector 
}: NutritionRecommendationProps) {
    
  const merAvg = calculateMER(pet.weight, pet.species, activity);
  console.log("MER:", merAvg);
  const petNeedVector = buildPetNeedVector(merAvg, healthCondition);
  const widthAndHeight = 150;
  const [mer,protein, fat, carb] = petNeedVector;
  console.log("Pet Need Vector:", petNeedVector);
  const series = [
      { value: protein, color: Colors.chartColorsBlue },
      { value: fat, color: Colors.chartColorsOrange },
      { value: carb, color: Colors.chartColorsGreen },
  ];
  console.log("NutritionRecommendation props:", { activity, healthCondition, merAvg, petNeedVector });

  return (
    <View style={styles.container}>
      <PieChart
        widthAndHeight={widthAndHeight}
        series={series}
        cover={{ radius: 0.6, color: 'white' }}
      />

      <View>
        <View style={styles.textContainer}>
          <Text style={styles.merText}>Calories: </Text>
          <Text style={styles.merText}>{mer.toFixed(1)} </Text>
          <Text style={styles.unitText}>kcal/day </Text>
        </View> 

        <View style={styles.legend}>
          <Text style={{ color: Colors.chartColorsBlue }}>■ Protein {protein.toFixed(0)} kcal</Text>
          <Text style={{ color: Colors.chartColorsOrange }}>■ Fat {fat.toFixed(0)} kcal</Text>
          <Text style={{ color: Colors.chartColorsGreen }}>■ Carb {carb.toFixed(0)} kcal</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: 20,
      padding: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        color: Colors.text,
        marginTop: 10,
        marginBottom: 10,
    },
    textContainer: {
      marginTop: 10,
      flexDirection: "row",
    },
    merText: {
      fontSize: 16,
      fontWeight: "500",
      color: Colors.text,
    },
    unitText: {
      fontSize: 14,
      fontWeight: "500",
      color: Colors.text,
      justifyContent: "center",
      alignSelf: "center",
    },
    legend: {
      flexDirection: "column",
      gap: 10,
      width: "80%",
      marginTop: 10,
    },
})
