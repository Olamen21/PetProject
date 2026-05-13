import { Colors } from "@/app/constants/Colors";
import CommonTextInput from "@/app/shared/components/CommonTextInput";
import { StyleSheet, Text, View } from "react-native";

export default function VaccineInfoCard () {
    return (
        <View>
            <View style={{ marginHorizontal: 10 }}>
                <Text style={styles.label}>{"Vaccine Name *"}</Text>
                <CommonTextInput
                    placeholder="e.g Rabies"
                    value={""}
                    onChangeText={() => {}}
                    backgroundColor= {Colors.white}
                    bordered
                />
            </View>

            <View style={styles.row}>
                <View style={styles.input}>
                    <Text style={styles.label}>{"Number *"}</Text>
                    <CommonTextInput
                        placeholder="4"
                        value={""}
                        onChangeText={() => {}}
                        backgroundColor= {Colors.white}
                        bordered
                    />
                </View>
                <View style={styles.input}>
                    <Text style={styles.label}>{"Dose *"}</Text>
                    <CommonTextInput
                        placeholder="1 ml"
                        value={""}
                        onChangeText={() => {}}
                        backgroundColor= {Colors.white}
                        bordered
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: "500",
        color: "#4A5568",
        marginTop: 10,
        marginBottom: 10,
    },
    row: {
        flexDirection: "row",
        gap: 12,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
    },
})