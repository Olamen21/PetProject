import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '@/app/constants/Colors';

interface MedicationCardProps {
  name: string;
  dose: string;
  days: number;
  type: 'pill' | 'injection';
}

const MedicationCard: React.FC<MedicationCardProps> = ({ name, dose, days, type }) => {
  return (
    <View style={styles.medicationCard}>
      <View style={styles.leftIndicator} />

      <View style={styles.medicationLeftSection}>
        <View style={styles.medicationIconCircle}>
          {type === 'injection' ? (
            <FontAwesome5 name="syringe" size={20} color={Colors.black} style={styles.rotatedIcon} />
          ) : (
            <MaterialCommunityIcons name="pill" size={24} color={Colors.black} style={styles.rotatedIcon} />
          )}
        </View>

        {/* Chi tiết thuốc */}
        <View style={styles.medicationInfo}>
          <Text style={styles.medicationName} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.medicationDose}>{dose}</Text>
        </View>
      </View>

      {/* Số ngày sử dụng thuốc ở bên phải */}
      <View style={styles.daysBadge}>
        <Text style={styles.daysText}>{days} ngày</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  medicationCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 88,
    position: 'relative',
    overflow: 'hidden',
    marginVertical: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  leftIndicator: {
    position: 'absolute',
    left: 0,
    top: '25%',
    bottom: '25%',
    width: 4,
    backgroundColor: Colors.primary,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  medicationLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingLeft: 4,
  },
  medicationIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rotatedIcon: {
    transform: [{ rotate: '-45deg' }],
  },
  medicationInfo: {
    marginLeft: 12,
    flex: 1,
  },
  medicationName: {
    fontSize: 17,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  medicationDose: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 3,
  },
  daysBadge: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginLeft: 8,
  },
  daysText: {
    fontSize: 13,
    color: '#555555',
    fontWeight: '500',
  },
});

export default MedicationCard;