import React, { useState } from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Colors } from "../../constants/Colors"; 

interface FilterMenuProps {
  filters: string[];                
  defaultSelected?: string;        
  onSelect?: (value: string) => void; 
}

export default function FilterMenu({
  filters,
  defaultSelected = filters[0],
  onSelect,
}: FilterMenuProps) {
  const [selected, setSelected] = useState(defaultSelected);

  const handleSelect = (item: string) => {
    setSelected(item);
    onSelect?.(item);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filters.map((item) => {
          const isActive = selected === item;
          return (
            <TouchableOpacity
              key={item}
              style={[styles.button, isActive && styles.activeButton]}
              onPress={() => handleSelect(item)}
              activeOpacity={0.8}
            >
              <Text style={[styles.text, isActive && styles.activeText]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 25, 
    backgroundColor: Colors.white,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.border, 
  },
  activeButton: {
    backgroundColor: Colors.primary, 
    borderColor: Colors.primary,
  },
  text: {
    fontSize: 14,
    color: Colors.text, 
    fontWeight: "600",
  },
  activeText: {
    color: Colors.white,
  },
});