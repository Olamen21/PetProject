import { Image, View, StyleSheet, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function TipCard() {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../../../assets/images/tipImage.jpg')}
                style={styles.image}
            />
            <Text style={styles.title}>The 8 best cat foods to buy</Text>
            <View style={styles.durationContainer}>
                <Ionicons name="book-outline" color="#333" size={18}/>
                <Text style={styles.duration}>8 minutes</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        paddingBottom: 12,
        marginRight: 12,
        
    },
    image: {
        width: '100%',
        height: 110,
        overflow: 'hidden',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        marginBottom: 8,
    },
    title: {
        fontSize: 14,
        fontWeight: '500',
        color: '#3B4953',
        marginHorizontal: 15,
        marginBottom: 4,
    },
    durationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
    },
    duration: {
        fontSize: 12,
        fontWeight: '400',
        color: '#5C5C5C',
        marginLeft: 10,
    }

})