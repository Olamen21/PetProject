import CommonButton from "@/app/shared/components/CommonButton";
import ModalHeader from "@/app/shared/components/ModalHeader";
import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import ChooseDateModal from "./ChooseDateModal";

interface Props {
  visible: boolean;
  onClose: () => void;
}

const OPTIONS = [
  "Only one day",
  "Weekly",
  "Every day",
  "On specific days of week",
];


export default function DateModal({ visible, onClose }: Props) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState(false);

    return (
        <Modal visible={visible} transparent animationType="fade">
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modal}>
                            <ModalHeader title="Frequency" onClose={onClose}/>
                            <View style={styles.optionsContainer}>
                                {OPTIONS.map((option) => {
                                    const isActive = selectedOption === option;
                                    return (
                                        <TouchableOpacity
                                        key={option}
                                        style={styles.option}
                                        onPress={() => setSelectedOption(option)}
                                        >
                                        <Text
                                            style={[
                                            styles.modalText,
                                            isActive && styles.activeText,
                                            ]}
                                        >
                                            {option}
                                        </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                            <CommonButton 
                                title="Next" 
                                onPress={() => setSelectedDate(true)}
                                backgroundColor="#90AB8B"
                                style={styles.button}
                            />
                            <ChooseDateModal visible={selectedDate} onClose={() => setSelectedDate(false)}/>
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
    optionsContainer: {
        borderRadius: 16,
        backgroundColor: "#fff",
        borderWidth: 1,
        paddingTop: 16,
        paddingHorizontal: 16,
        borderColor: "#E0E0E0",
    },
    option: {
        paddingBottom: 16,
    },
    modalText: {
        fontSize: 16,
        color: "#1D1D1D",
        paddingVertical: 12,
        fontWeight: "400",
    },
    activeText: {
        color: "#90AB8B",
    },
    button: {
        marginTop: 20,
        paddingVertical: 12,
    }
}); 