import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ViewStyle } from 'react-native';
import { 
  Ionicons, 
  FontAwesome6, 
  MaterialCommunityIcons, 
  Feather 
} from '@expo/vector-icons';
import { Colors } from '@/app/constants/Colors';

export type DocumentIconType = 'document' | 'doctor' | 'insurance' | 'dental' | 'bone';

interface DocumentItemProps {
  date: string;
  title: string;
  subtitle: string;
  iconType: DocumentIconType;
  onViewPress?: () => void;
  containerStyle?: ViewStyle;
}

const DocumentItem: React.FC<DocumentItemProps> = ({
  date,
  title,
  subtitle,
  iconType,
  onViewPress,
  containerStyle,
}) => {
  
    const renderLeftIcon = () => {
        const iconColor = Colors.black;
        const iconSize = 24;

        switch (iconType) {
        case 'document':
            return <Ionicons name="document-text-outline" size={iconSize} color={iconColor} />;
        case 'doctor':
            return <FontAwesome6 name="user-doctor" size={22} color={iconColor} />;
        case 'insurance':
            return <MaterialCommunityIcons name="hand-heart-outline" size={iconSize} color={iconColor} />;
        case 'dental':
            return <MaterialCommunityIcons name="tooth-outline" size={26} color={iconColor} />;
        case 'bone':
            return <MaterialCommunityIcons name="bone" size={24} color={iconColor} />;
        default:
            return <Ionicons name="document-text-outline" size={iconSize} color={iconColor} />;
        }
    };

  return (
    <View style={[styles.cardContainer, containerStyle]}>

      <View style={styles.leftSection}>
        <View style={styles.iconCircle}>
          {renderLeftIcon()}
        </View>

        {/* Thông tin văn bản */} 
        <View style={styles.infoContainer}>
          <Text style={styles.dateText}>{date}</Text>
          <Text style={styles.titleText} numberOfLines={2}>{title}</Text>
          <Text style={styles.subtitleText} numberOfLines={1}>{subtitle}</Text>
        </View>
      </View>

        <TouchableOpacity 
            style={styles.viewButton} 
            onPress={onViewPress}
            activeOpacity={0.6}
        >
        <Feather name="eye" size={22} color={Colors.black} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
    marginVertical: 6,
    marginHorizontal: 10, 
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    marginLeft: 14,
    flex: 1,
    paddingRight: 8,
  },
  dateText: {
    fontSize: 12,
    color: Colors.subtitleColor,
    fontWeight: '500',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginTop: 2,
  },
  subtitleText: {
    fontSize: 12,
    color: Colors.subtitleColor,
    marginTop: 2,
  },
  viewButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
  },
});

export default DocumentItem;