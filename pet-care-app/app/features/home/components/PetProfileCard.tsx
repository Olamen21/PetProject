import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import CommonButton from '@/app/shared/components/CommonButton';

type PetProfileCardProps = {
  name: string;
  age: string;
  nutritions?: string;
  weight?: string;
  height?: string;
  onCompletePress?: () => void;
};

const PetProfileCard: React.FC<PetProfileCardProps> = ({
  name = '-',
  age = '-',
  nutritions = '-',
  weight = '-',
  height = '-',
  onCompletePress,
}) => {
  return (
    <View style={styles.container}>
      {/* Pet Icon + Name */}
      <View style={styles.header}>
        <View style={styles.wrapperHeader}>
            <View style={styles.wrapperHeaderIcon}>
                <Image
                    source={require('../../../../assets/images/dogIcon.jpg')}
                    style={styles.icon}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.name}>{name}</Text>
        </View>
        <TouchableOpacity style={styles.wrapperHeader}>
          <View style={styles.wrapperIcon}>
              <Ionicons name="add-outline" color="#333" size={32}/>
          </View>
        </TouchableOpacity>
      </View>
      <LinearGradient 
        colors={['#EBF4DD', '#fff']} 
        style={styles.card}
      >

        {/* Info Rows */}
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
              <View style={styles.wrapperIconInfo}>
                  <Ionicons name="timer-outline" color="#333" size={24}/>
              </View>
              <Text style={styles.label}>Age</Text>
              <Text style={styles.value}>{age}</Text>
          </View>
          <View style={styles.infoRow}>
              <View style={styles.wrapperIconInfo}>
                  <Ionicons name="fast-food-outline" color="#333" size={24}/>
              </View>
              <Text style={styles.label}>Nutritions</Text>
              <Text style={styles.value}>{nutritions}</Text>
          </View>
          <View style={styles.infoRow}>
              <View style={styles.wrapperIconInfo}>
                  <Ionicons name="scale-outline" color="#333" size={24}/>
              </View>
              <Text style={styles.label}>Weight</Text>
              <Text style={styles.value}>{weight}</Text>
          </View>
          <View style={styles.infoRow}>
              <View style={styles.wrapperIconInfo}>
                  <Ionicons name="expand-outline" color="#333" size={24}/>
              </View>
              <Text style={styles.label}>Height</Text>
              <Text style={styles.value}>{height}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Button */}
        <CommonButton
          title="Complete your pet's profile"
          onPress={onCompletePress || (() => {})}
          iconName="folder-open-outline"
          iconColor="#fff"
          backgroundColor="#5A7863"
          textColor="#fff"
          style={styles.button}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  card: {
    marginTop: 10,
    padding: 10,
    borderRadius: 36,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
  },
  wrapperHeader: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  wrapperHeaderIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 84,
    marginRight: 12,
    marginBottom: 8,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#5A7863',
    overflow: 'hidden',
    borderStyle: 'solid',
  },
  wrapperIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 84,
    marginRight: 12,
    marginBottom: 8,
    backgroundColor: '#F2F2F2',
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#AEAEAE',
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  addIconWrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    width: 80,
    height: 120,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: '#5A7863',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  infoRow: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',   // căn giữa theo chiều dọc trong container
    alignItems: 'center',       // căn giữa theo chiều ngang
    marginBottom: 12,
  },
  wrapperIconInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    marginBottom: 4,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  label: {
    fontSize: 10,
    color: '#5C5C5C',
    marginBottom: 4,
    textAlign: 'center',
    flexWrap: 'wrap',
    width: 70,
  },
  value: {
    fontSize: 12,
    color: '#1D1D1D',
    fontWeight: '500',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#90AB8B',
    marginVertical: 5,
  },
  button: {
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: '#5A7863',
    paddingVertical: 12,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 14,
  },
});

export default PetProfileCard;