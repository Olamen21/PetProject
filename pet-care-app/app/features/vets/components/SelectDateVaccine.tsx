import CommonSelector from "@/app/shared/components/CommonSelector";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/app/constants/Colors";
import { useState } from "react";
import type { Vaccine } from "../types/Vaccine";

interface SelectDateVaccineProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}
export default function SelectDateVaccine({
  selectedDate,
  onDateChange,
}: SelectDateVaccineProps) {
//   const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState<boolean>(false);
//   const [mode, setMode] = useState<"date" | "time">("date");

  const onChange = (event: any, date?: Date) => {
    setShow(false);
    if (date) {
      onDateChange(date);
    }
  };

//   const showMode = (modeToShow: "date" | "time") => {
//     setShow(true);
//     setMode(modeToShow);
//   };

 return (
    <View>
      {/* <Text style={{ ...styles.label, marginLeft: 10 }}>Dose 1</Text> */}
      <View style={styles.row}>
        <CommonSelector
          value={selectedDate.toLocaleDateString("en-GB")}
          placeholder="Select Date"
          onPress={() => setShow(true)}
        />

        {show && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            onChange={onChange}
            display="default"
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4A5568",
    marginTop: 10,
    marginBottom: 10,
  },
  row: {
    // flexDirection: "row",
    gap: 12,
    paddingHorizontal: 10,
  },
  buttonAdd: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    height: 55,
  },
});
