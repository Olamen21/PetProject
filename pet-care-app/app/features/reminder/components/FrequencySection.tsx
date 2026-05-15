import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CommonSwitch from "@/app/shared/components/CommonSwitch";
import DateModal from "./FrequencyModal";

type Props = {
  isEnabledTime: boolean;
  toggleSwitchTime: () => void;
  isEnabledPin: boolean;
  toggleSwitchPin: () => void;
  isEnabledNoti: boolean;
  toggleSwitchNoti: () => void;
};

export default function FrequencySection({
  isEnabledTime,
  toggleSwitchTime,
  isEnabledPin,
  toggleSwitchPin,
  isEnabledNoti,
  toggleSwitchNoti,
}: Props) {

    const [selectedDate, setSelectedDate] = useState(false);

  return (
    <View>
      <Text style={styles.label}>Frequency</Text>

      <View style={styles.container}>
        <View style={styles.row}>
            <View style={styles.row}>
                <Ionicons name="calendar-clear-outline" size={24} color="#1D1D1D" style={styles.icon}/>
                <Text style={styles.text}>Every day</Text>
            </View>
            <TouchableOpacity onPress={() => setSelectedDate(true)} style={{ marginLeft: "auto" }}>
                <Ionicons name="chevron-forward" size={24} color="#1D1D1D" />
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
            <View style={styles.row}>
                <Ionicons name="timer-outline" size={24} color="#1D1D1D" style={styles.icon}/>
                <Text style={styles.text}>2 times per day</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#1D1D1D" />
        </View>
        <View style={styles.row}>
            <View style={styles.timer}>
                <Text style={styles.timerText}>10:00</Text>
            </View>
            <View style={styles.timer}>
                <Text style={styles.timerText}>16:00</Text>
            </View>
        </View>
      </View>

        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.row}>
                    <Ionicons name="calendar-outline" size={24} color="#1D1D1D" style={styles.icon}/>
                    <Text style={styles.text}>Time interval</Text>
                </View>
                <CommonSwitch value={isEnabledTime} onChange={toggleSwitchTime} />
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Start from</Text>
                <View style={styles.row}>
                    <Text style={styles.dateText}>Tue, Jan 20</Text>
                    <Ionicons name="chevron-forward" size={24} color="#1D1D1D" />
                </View>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Ends in</Text>
                <View style={styles.row}>
                    <Text style={styles.dateText}>Sat, Jan 31</Text>
                    <Ionicons name="chevron-forward" size={24} color="#1D1D1D" />
                </View>
            </View>
        </View>

        <View style={styles.container}>
            <View style={[styles.row, { marginBottom: 0 }]}>
                <View style={[styles.row, { marginBottom: 0 }]}>
                    <Ionicons name="pricetag-outline" size={24} color="#1D1D1D" style={styles.icon}/>
                    <Text style={styles.text}>Pin to top</Text>
                </View>
                <CommonSwitch value={isEnabledPin} onChange={toggleSwitchPin}/>
            </View>
        </View>

        <View style={styles.container}>
            <View style={[styles.row, { marginBottom: 0 }]}>
                <View style={[styles.row, { marginBottom: 0 }]}>
                    <Ionicons name="notifications-outline" size={24} color="#1D1D1D" style={styles.icon}/>
                    <Text style={styles.text}>Notification</Text>
                </View>
                <CommonSwitch value={isEnabledNoti} onChange={toggleSwitchNoti}/>
            </View>
        </View>

        <DateModal visible={selectedDate} onClose={() => setSelectedDate(false)}/>

    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginTop: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {  marginRight: 8 },
  text: { 
    fontSize: 16,
    color: '#1D1D1D',
    fontWeight: '400',
   },
   timerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 12,
   },
   timer: {
    backgroundColor: '#EBF4DD',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
   },
   timerText: {
    fontSize: 16,
    color: '#1D1D1D',
    width: '100%',
    textAlign: 'center',
    fontWeight: '400',
   },
   dateText: {
    fontSize: 14,
    color: '#1D1D1D',
    fontWeight: '400',
   }
});