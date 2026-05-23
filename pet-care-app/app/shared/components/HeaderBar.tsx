import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors'; 

type HeaderIcon = {
  type: "ion" | "image";
  name?: keyof typeof Ionicons.glyphMap;
  source?: any;                                     
  onPress?: () => void;
  showDot?: boolean;
};

type HeaderBarProps = {
  title?: string;
  logo?: any;
  rightIcons?: HeaderIcon[];
  leftIcons?: HeaderIcon[]; 
};

export const HeaderBar: React.FC<HeaderBarProps> = ({
  title,
  logo,
  rightIcons = [],
  leftIcons = [],
}) => {
  return (
      <View style={styles.container}>
        <View style={styles.left}>
          {leftIcons.map((icon, index) => (
            <TouchableOpacity key={index} onPress={icon.onPress} style={styles.iconWrapper}>
              {icon.type === "ion" && icon.name && (
                <Ionicons name={icon.name} size={26} color={Colors.text} />
              )}
              {icon.type === "image" && icon.source && (
                <Image source={icon.source} style={styles.avatar} />
              )}
            </TouchableOpacity>
          ))}

          {logo ? (
            <Image 
              source={logo} 
              style={styles.logo} 
              resizeMode="contain"
            />) : (
              <Text style={styles.title}>{title}</Text>
            )}
        </View>

       
        <View style={styles.right}>
          {rightIcons.map((icon, index) => (
            <TouchableOpacity key={index} onPress={icon.onPress} style={styles.iconWrapper}>
              {icon.type === "ion" && icon.name && (
                <Ionicons name={icon.name} size={26} color={Colors.text} />
              )}
              {icon.type === "image" && icon.source && (
                <Image source={icon.source} style={styles.avatar} resizeMode="cover" />
              )}
              {icon.showDot && <View style={styles.dot} />}
            </TouchableOpacity>
          ))}
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    paddingTop: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#FAFAFA",
    
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40, 
    height: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.primary, 
    marginLeft: 4,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.error, 
    borderWidth: 1.5,
    borderColor: Colors.white,
  },
  iconWrapper: {
    marginLeft: 12,
    position: 'relative',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.background,
  },
});

export default HeaderBar;