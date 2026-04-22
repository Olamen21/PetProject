import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors"; 
import CommonButton from "./CommonButton";
import CommonTextInput from "./CommonTextInput";

const screenHeight = Dimensions.get("window").height;

type Props = {
  visible: boolean;
  onClose: () => void;
  options: string[];
  selected?: string;
  onSelect: (value: string) => void;
  title?: string;
  searchable?: boolean;
};

export default function CommonSelectModal({
  visible,
  onClose,
  options,
  selected,
  onSelect,
  title = "Select option",
  searchable = true,
}: Props) {
  const [search, setSearch] = useState("");

  const filtered = searchable
    ? options.filter((o) => o.toLowerCase().includes(search.toLowerCase()))
    : options;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.dragBar} />

          <View style={styles.headerRow}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-outline" size={32} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          {searchable && (
            <CommonTextInput
              icon="search"
              placeholder={`Search ${title.toLowerCase()}`}
              backgroundColor={Colors.white}
              value={search}
              onChangeText={setSearch}
              bordered={true}
              borderColor={Colors.gray}
              borderWidth={1}
            />
          )}

          <FlatList
            data={filtered}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.item, item === selected && { backgroundColor: Colors.background }]}
                onPress={() => onSelect(item)}
              >
                <Text
                  style={[
                    styles.itemText,
                    item === selected && { color: Colors.primary, fontWeight: "bold" },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            style={styles.list}
          />

          <CommonButton
            title="Done"
            onPress={onClose}
            backgroundColor={selected ? Colors.primary : Colors.secondary}
            textColor={Colors.white}
            style={styles.button}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)", 
  },
  modal: {
    height: screenHeight * 0.65,
    backgroundColor: Colors.white, 
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    elevation: 10,
  },
  dragBar: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: Colors.gray,
    alignSelf: "center",
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primary,
  },
  list: {
    flex: 1,
    marginBottom: 16,
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  itemText: {
    fontSize: 16,
    color: Colors.text,
  },
  button: {
    borderRadius: 12,
    height: 50,
  },
});