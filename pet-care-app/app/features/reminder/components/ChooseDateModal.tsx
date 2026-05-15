import ModalHeader from "@/app/shared/components/ModalHeader";
import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function ChooseDateModal({ visible, onClose }: Props) {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modal}>
                            <ModalHeader title="5 Days of week" onClose={onClose}/>
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
        backgroundColor: "#F2F2F2",
        borderRadius: 16,
        padding: 20,
    },
});