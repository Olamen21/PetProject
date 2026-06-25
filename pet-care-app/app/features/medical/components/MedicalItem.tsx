import React from 'react';
import { StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '@/app/constants/Colors';

interface MedicalItemProps {
  name: string;
  dose: string;
  type?: 'pill' | 'injection'; 
  status: 'refill' | 'active' | 'expired';
}

interface StatusItemConfig {
  text: string;
  bgStyle: ViewStyle;    
  textStyle: TextStyle; 
}

const STATUS_CONFIG: Record<'refill' | 'active' | 'expired', StatusItemConfig> = {
  refill: {
    text: 'Request Refill',
    bgStyle: { backgroundColor: Colors.bg_tag_blue }, 
    textStyle: { color: Colors.text_tag_blue, fontWeight: '500' },
  },
  active: {
    text: 'Active',
    bgStyle: { backgroundColor: Colors.bg_tag_green }, 
    textStyle: { color: Colors.text_tag_green, fontWeight: '600' },
  },
  expired: {
    text: 'Expired',
    bgStyle: { backgroundColor: Colors.bg_tag_gray }, // Xám nhạt
    textStyle: { color: Colors.text_tag_gray, fontWeight: '600' },
  },
};

const MedicalItem = ({ name, dose, type = 'pill', status }: MedicalItemProps) => {
  const currentStatus = STATUS_CONFIG[status];

  return (
    <View style={styles.cardContainer}>
      <View style={styles.leftIndicator} />

      <View style={{ flex: 1 }}>
        <View style={styles.leftSection}>
          <View style={styles.iconCircle}>
            {type === 'injection' ? (
              <FontAwesome5 name="syringe" size={24} color={Colors.black} />
            ) : (
              <MaterialCommunityIcons name="pill" size={24} color={Colors.black}/>
            )}
          </View>

          {/* Tên thuốc và liều lượng */}
          <View style={styles.infoContainer}>
            <Text style={styles.nameText} numberOfLines={1}>{name}</Text>
            <Text style={styles.doseText}>{dose}</Text>
          </View>
        </View>
      </View>

       
        <View style={[styles.statusBadge, currentStatus.bgStyle]}>
            <Text style={[styles.statusText, currentStatus.textStyle]}>
                {currentStatus.text}
            </Text>
        </View>
        
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 24,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginVertical: 6,
  },
  leftIndicator: {
    position: 'absolute',
    left: 0,
    top: '25%',
    bottom: '25%',
    width: 5,
    backgroundColor: Colors.primary,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingLeft: 8,
  },
  iconCircle: {
    width: 48,
    height: 58,
    borderRadius: 28,
    backgroundColor: Colors.bg_tag_gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    marginLeft: 14,
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  doseText: {
    fontSize: 12,
    color: Colors.text_secondary,
    marginTop: 4,
  },
  statusBadge: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  statusText: {
    fontSize: 10,
  },
});

export default MedicalItem;