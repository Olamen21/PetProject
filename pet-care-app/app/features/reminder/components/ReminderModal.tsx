import CommonButton from "@/app/shared/components/CommonButton";
import ModalHeader from "@/app/shared/components/ModalHeader";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onPin: () => void;
}

export default function ReminderModal({
  visible,
  onClose,
  onEdit,
  onPin,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.overlay}>
                <TouchableWithoutFeedback>
                    <View style={styles.modal}>
                        <ModalHeader title="Food reminder" onClose={onClose}/>
                        <View style={styles.timeContainer}>
                            <Ionicons name="stopwatch-outline" size={24} color="#3B4953"/>
                            <Text style={styles.timeText}>09:00</Text>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.iconWrapper}>
                                <Ionicons name="restaurant-outline" size={24} color="#fff"/>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.food}>Royale canin dry food</Text>
                                <Text style={styles.quantity}>120 g</Text>
                            </View>
                            <View style={styles.avatarWrapper}>
                                <Image
                                    source={require("../../../../assets/images/catReminder.jpg")}
                                    style={styles.avatar}
                                />
                                <Text style={styles.petName}>Janny</Text>
                            </View>
                        </View>

                        <View style={styles.description}>
                            <Text style={styles.descLabel}>Description</Text>
                            <View style={styles.descTextWapper}>
                                <Text style={styles.descText}>Don't forget to use from new plate</Text>
                            </View>
                        </View>

                        <View style={styles.actions}>
                            <CommonButton
                                title="Edit"
                                onPress={onEdit}
                                backgroundColor="#FAFAFA"
                                textColor="#5A7863"
                                bordered = {true}
                                borderColor="#5A7863"
                                style={styles.button}
                                iconName="create-sharp"
                                iconColor="#5A7863"
                            />
                            <CommonButton
                                title="Pin"
                                onPress={onPin}
                                backgroundColor="#FAFAFA"
                                textColor="#5A7863"
                                bordered = {true}
                                borderColor="#5A7863"
                                style={styles.button}
                                iconName="pin"
                                iconColor="#5A7863"
                            />
                        </View>
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
  timeContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 16,
  },
  timeText: {
    width: 50,
    fontSize: 16,
    color: "#5C5C5C",
    marginLeft: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 120,
    backgroundColor: "#F74E75",
    marginRight: 5,
  },
  avatarWrapper: {
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    width: 54,
    height: 64,
    borderRadius: 120,
    marginRight: 0,
  },
  info: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  food: {
    fontSize: 14,
    fontWeight: "500",
    color: "#3B4953",
  },
  quantity: {
    fontSize: 12,
    color: "#5c5c5c",
    fontWeight: "500",
  },
  petName: {
    fontSize: 12,
    fontWeight: "400",
    color: "#1D1D1D",
  },
  description: {
    marginTop: 10,
    marginBottom: 16,
  },
  descLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#3B4953",
    marginBottom: 6,
  },
  descTextWapper: {
    paddingTop: 10,
    borderWidth: 1,
    borderColor: "#e9e9e9",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingBottom: 10,
    height: 96,
    backgroundColor: "#fff",
  },
  descText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#3c3c3c",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
  }
});