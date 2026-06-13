import { Colors } from "@/app/constants/Colors";
import CommonButton from "@/app/shared/components/CommonButton";
import HeaderBar from "@/app/shared/components/HeaderBar";
import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

interface DoctorData {
    name: string;
    title: string;
    avatarUrl: string;
}

export default function GiveFeedbackPage() {
    const router = useRouter()
    const doctor: DoctorData = {
        name: 'Dr. Sara Fredo Jay',
        title: 'DVM, Veterinary Dermatologist',
        avatarUrl: 'https://tse3.mm.bing.net/th/id/OIP.JW_4m4RVV4ywf0aiB6TWrgHaLH?cb=thfvnextfalcon2&rs=1&pid=ImgDetMain&o=7&rm=3'
    }

    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const WORD_LIMIT = 120;

    const getWordCount = (text: string): number => {
        if (!text.trim()) return 0;
        return text.trim().split(/\s+/).length;
    };

    const currentWordCount = getWordCount(comment);
    const isSubmitDisabled = rating === 0 || currentWordCount === 0 || currentWordCount > WORD_LIMIT;

    const handleTextChange = (text: string) => {
        setComment(text);
    };

    const handleSubmit = () => {
        if (isSubmitDisabled) return;

        console.log('Dữ liệu đánh giá gửi đi:', {
            rating,
            comment: comment.trim()
        });

        router.replace("/(tabs)/VetPage")
    };

    useFocusEffect(
        useCallback(() => {
        setRating(0);
        setComment('');

        return ;
        }, [])
    );

    return (
        <View style={styles.container}>
            <HeaderBar 
                title="Give feedback"
                leftIcons={[
                    {
                        type: "ion",
                        name: "chevron-back-outline",
                        onPress: () => router.push("/(tabs)/VetPage")
                    }
                ]}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style= {{flex: 1}}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        <Text style={styles.headerTitle}>Your Review </Text>
                        <Text style={styles.headerSubtitle}>
                            Help us improve by telling us how was your experience with
                        </Text>

                        <View style={styles.avatarContainer}>
                            <Image
                                source={{ uri: doctor.avatarUrl }}
                                style={styles.avatarImage} 
                            />
                            <View style={styles.avatarBorderDecoration} />
                        </View>

                        <Text style={styles.doctorName}>{doctor.name} </Text>
                        <Text style={styles.doctorTitle}>{doctor.title}  </Text>

                        <View style={styles.ratingContainer}>
                            {[1,2,3,4,5].map((star) => (
                                <TouchableOpacity
                                    key={star}
                                    activeOpacity={0.7}
                                    onPress={() => setRating(star)}
                                    style={styles.starTouchArea}
                                >
                                    <FontAwesome 
                                        name={star <= rating ? 'star' : 'star-o'}
                                        size={40}
                                        color={star <= rating ? '#FFC107' : '#A9B5C1'}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.commentHeaderRow}>
                            <Text style={styles.commentLabel}>Write a Comment</Text>
                            <Text style={[
                                styles.wordCountText,
                                currentWordCount > WORD_LIMIT && { color: Colors.red }
                            ]}>
                                {currentWordCount}/{WORD_LIMIT} words </Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Comment"
                                placeholderTextColor={Colors.gray}
                                multiline={true}
                                numberOfLines={5}
                                textAlignVertical="top"
                                value={comment}
                                onChangeText={handleTextChange}
                            />
                        </View>

                        <View style={styles.buttonGroup}>
                            <CommonButton 
                                title="Cancel"
                                onPress={() => {}}
                                backgroundColor= {Colors.white}
                                textColor= {Colors.primary}
                                bordered
                            />

                            <CommonButton
                                title="Submit"
                                onPress={handleSubmit}
                                backgroundColor= {isSubmitDisabled ? Colors.gray : Colors.primary}
                                disabled={isSubmitDisabled}
                            />
                        </View>


                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    scrollContent: {
        paddingHorizontal:24,
        paddingTop: 40,
        paddingBottom: 30,
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text,
        textAlign: 'center'
    },
    headerSubtitle: {
        fontSize: 16,
        color: Colors.text_secondary,
        textAlign: 'center',
        marginTop: 12,
        lineHeight: 24,
        paddingHorizontal: 16
    },
    avatarContainer: {
        width: 130,
        height: 130,
        marginTop: 35,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarImage: {
        width: 90,
        height: 120,
        borderRadius: 60,
        zIndex: 2,
    },
    avatarBorderDecoration: {
        position: 'absolute',
        width: 100,
        height: 130,
        borderRadius: 65,
        borderWidth: 2,
        borderColor: Colors.primary,
        opacity: 0.8
    },
    doctorName: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text,
        marginTop: 18,
        textAlign: 'center'
    },
    doctorTitle: {
        fontSize: 10,
        color: Colors.subtitleColor,
        marginTop: 4,
        textAlign: 'center'
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
        width: '100%'
    },
    starTouchArea: {
        paddingHorizontal: 6
    },
    commentHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 35,
        marginBottom: 10,
    },    
    commentLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.text,
    },
    wordCountText: {
        fontSize: 13,
        color: '#8E8E93',
    },
    inputContainer: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        paddingHorizontal: 16,
        paddingVertical: 14,
        minHeight: 120,
    },
    textInput: {
        fontSize: 16,
        color: '#1A1A1A',
        flex: 1,
        paddingTop: 0, 
    },
    buttonGroup: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 45,
    },
})