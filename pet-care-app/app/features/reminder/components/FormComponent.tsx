import CommonTextInput from "@/app/shared/components/CommonTextInput";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import FrequencyModal from "./CategoryModal";
import DescriptionInput from "./DescriptionInput";
import FrequencySection from "./FrequencySection";

export default function FormComponent() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [formState, setFormState] = useState({
        text: "",
        title: "",
        amount: "",
        isEnabledTime: false,
        isEnabledPin: false,
        isEnabledNot: false,
    })

    const wordCount = formState.text.trim().length > 0 ? formState.text.trim().split(/\s+/).length : 0;

    const updateField = (field: keyof typeof formState, value: any) => {
        setFormState(prev => ({ ...prev, [field]: value }));
    };

    return (
        <View style={styles.formContainer}>

            {/* Title */}
            <Text style={styles.label}>Title</Text>
            <CommonTextInput
                placeholder=""
                bordered={true}
                borderColor="#E0E0E0"
                borderWidth={1}
                onChangeText={val => updateField("title", val)}
                value={formState.title}
                backgroundColor="#fff"
            />

            {/* Amount */}
            <Text style={styles.label}>Amount</Text>
            <CommonTextInput
                placeholder=""
                bordered={true}
                borderColor="#E0E0E0"
                borderWidth={1}
                value={formState.amount}
                backgroundColor="#fff"
                onChangeText={val => updateField("amount", val)}
            />

            {/* Description */}
            <DescriptionInput
                value={formState.text}
                onChangeText={(val) => {
                    const words = val.trim().split(/\s+/);
                    if (words.length <= 120) updateField("text", val);
                }}
                wordCount={wordCount}
            />

            {/* Frequency */}

            <FrequencySection
                isEnabledTime={formState.isEnabledTime}
                toggleSwitchTime={() => updateField("isEnabledTime", !formState.isEnabledTime)}
                isEnabledPin={formState.isEnabledPin}
                toggleSwitchPin={() => updateField("isEnabledPin", !formState.isEnabledPin)}
                isEnabledNoti={formState.isEnabledNot}
                toggleSwitchNoti={() => updateField("isEnabledNot", !formState.isEnabledNot)}
                onPress={() => {}}
            />

            
            <FrequencyModal visible={isModalVisible} onClose={() => setModalVisible(false)}/>

        </View>
    );
}

const styles = StyleSheet.create({
formContainer: {
    marginTop: 20,
    marginHorizontal: 20,
},
label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
},
})