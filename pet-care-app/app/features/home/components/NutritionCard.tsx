import CommonButton from "@/app/shared/components/CommonButton";
import { Text, View, StyleSheet, Image } from "react-native";

export default function NutritionCard() {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Smart Nutrition</Text>
                <Text style={styles.description}>AI creates the best meals for your pet</Text>
                <CommonButton
                    title="Get Started"
                    backgroundColor="#F77B4E"
                    onPress={() => console.log("Get Started with Nutrition!")}
                    textStyle={{ fontSize: 14, fontWeight: 400}}
                    style={styles.button}
                />
            </View>
            <Image
                source={require('../../../../assets/images/nutritionBackground.png')}
                style={styles.image}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        margin: 10,
        marginBottom: 20,
        backgroundColor: '#FDE6C5',
        padding: 15,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        marginRight: 5,
    },
    title: {
        color: '#3B4953',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    description: {
        color: '#3B4953',
        fontSize: 12,
        fontWeight: '400',
        marginBottom: 12,
    },
    button: {
        alignSelf: 'flex-start',
        paddingVertical: 10,
        borderRadius: 12,
    },
    image: {
        flex: 1,
        height: 150,
        maxWidth: 150,
    },

})