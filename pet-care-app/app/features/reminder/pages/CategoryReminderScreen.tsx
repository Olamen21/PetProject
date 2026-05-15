import React, { useState } from "react";
import HeaderBar from "@/app/shared/components/HeaderBar";
import {View, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import TaskModal from "../components/TaskModal";
import PetAvatar from "../components/PetAvatar";
import FormComponent from "../components/FormComponent";

const avatars = [
  require('../../../../assets/images/dogIcon.jpg'),
  require('../../../../assets/images/dogIcon.jpg'),
]

export default function CategoryReminderScreen() {

  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  return (
    <View style={styles.container}>
      <HeaderBar
        title="Pills Reminder"
        leftIcons={[{type: "ion", name: "chevron-back-outline", onPress: () => router.push('/(tabs)/ReminderScreen')}]}
        rightIcons={[{type: "ion", name: "apps-outline", onPress: () => setShowModal(true)}]}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.petAvatarContainer}>
          {avatars.map((source, index) => (
            <PetAvatar 
              key={index}
              source={source}
              isSelected={selectedIndex === index}
              onPress={() => setSelectedIndex(index)}
            />
          ))}
        </View>

        <FormComponent />
      </ScrollView>

      <TaskModal visible={showModal} onClose={() => setShowModal(false)} />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingBottom: 60,
  },
  petAvatarContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
  }
})