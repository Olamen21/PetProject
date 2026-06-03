import { Colors } from "@/app/constants/Colors";
import CommonSelectModal from "@/app/shared/components/CommonSelectModal";
import CommonSelector from "@/app/shared/components/CommonSelector";
import { StyleSheet, Text, View } from "react-native";
import { PetCondition } from "../utils/NutritionUtils";

type ActivitySelectorProps = {
    activity: string | undefined;
    healthCondition?: PetCondition;
    setActivity: (activity: string) => void;
    setHealthCondition: (condition: PetCondition) => void;
    showModal: boolean;
    showHealthConditionModal: boolean;
    setShowModal: (show: boolean) => void;
    setShowHealthConditionModal: (show: boolean) => void;
    activityList: string[];
    healthConditionList: PetCondition[];
}

export default function ActivitySelector({ 
    activity, 
    healthCondition,
    setActivity, 
    setHealthCondition,
    showModal, 
    showHealthConditionModal,
    setShowModal, 
    setShowHealthConditionModal,
    activityList,
    healthConditionList
}: ActivitySelectorProps) {
  return (
    <>
      <View style={styles.analysisSection}>
        <Text style={styles.label}>Activity/ Life stage*</Text>
        <CommonSelector
          value={activity}
          placeholder="Select activity/life stage"
          onPress={() => setShowModal(true)}
        />
        <CommonSelectModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          options={activityList}
          selected={activity}
          onSelect={(text) => setActivity(text)}
          title="Select activity/life stage"
        />
      </View>
      <View style={styles.analysisSection}>
          <Text style={styles.label}>Health Condition</Text>
          <CommonSelector
            value={healthCondition}
            placeholder="Select health condition "
            onPress={() => setShowHealthConditionModal(true)}
          />
          <CommonSelectModal
            visible={showHealthConditionModal}
            onClose={() => setShowHealthConditionModal(false)}
            options={healthConditionList}
            selected={healthCondition}
            onSelect={(text) => setHealthCondition(text as PetCondition)}
            title="Select health condition"
          />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
    analysisSection: {
        marginHorizontal: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        color: Colors.text,
        marginTop: 10,
        marginBottom: 10,
    },
})