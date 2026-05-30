import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";

interface WeeklyCalendarProps {
  onSelectDate?: (date: Date) => void;
}
export default function WeeklyCalendar({ onSelectDate }: WeeklyCalendarProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState<Date[]>([]);

  useEffect(() => {
    const today = new Date();
    const monday = startOfWeek(today, { weekStartsOn: 1 }); 
    const dates = Array.from({ length: 7 }, (_, i) => addDays(monday, i));
    setWeekDates(dates);
  }, []);
 const handlePress = (date: Date) => {
    setSelectedDate(date);
    onSelectDate?.(date); 
  };
  return (
    <View style={styles.container}>
      {weekDates.map((date) => {
        const isSelected = isSameDay(date, selectedDate);
        return (
            <View key={date.toISOString()} style={styles.wrapper}>
                <TouchableOpacity
                    style={[styles.item, isSelected && styles.selectedItem]}
                    onPress={() => handlePress(date)}
                >
                    <Text style={[styles.date, isSelected && styles.selectedText]}>
                    {format(date, "d")}
                    </Text>
                </TouchableOpacity>
                <Text style={[styles.day]}>
                {format(date, "EEE")} {/* Mon, Tue, ... */}
                </Text>
            </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#fafafa",
  },
  wrapper: {
    alignItems: "center",
    paddingHorizontal: 5,
  },
  item: {
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F2F2F2",
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  selectedItem: {
    backgroundColor: "#F77B4E",
  },
  date: {
    fontSize: 18,
    fontWeight: "500",
    color: "#3B4953",
  },
  day: {
    fontSize: 12,
    color: "#3B4953",
    fontWeight: "500",
  },
  selectedText: {
    color: "#fff",
  },
});