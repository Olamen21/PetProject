import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import HeaderBar from '@/app/shared/components/HeaderBar';
import { Colors } from '@/app/constants/Colors';
import MedicationCard from '../components/MedicationCard';
import { MedicationItem } from '../../medical/types/Prescriptions'; 

export default function DocumentDetailPage() {
  const router = useRouter();
  
  const params = useLocalSearchParams<{
    id: string;
    title: string;
    date: string;
    vetName: string;
    diagnosis: string;
    weight: string;
    symptoms: string;
    notes: string;
    prescriptionsData?: string; 
  }>();

  let displayMedications: MedicationItem[] = [];
  if (params.prescriptionsData) {
    try {
      displayMedications = JSON.parse(params.prescriptionsData);
    } catch (e) {
      console.error("Lỗi khi giải mã danh sách thuốc:", e);
    }
  }

  return (
    <View style={styles.mainContainer}>
      <HeaderBar
        title="Chi tiết đơn thuốc"
        leftIcons={[
          {
            type: "ion",
            name: "chevron-back-outline",
            onPress: () => router.push("/(tabs)/DocumentPage"),
          },
        ]}
      />

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Khối 1: Tên Bác sĩ & Ngày khám */}
        <View style={styles.clinicCard}>
          <View style={styles.clinicIconCircle}>
            <Ionicons name="medical" size={24} color={Colors.primary} />
          </View>
          <View style={styles.clinicInfo}>
            <Text style={styles.clinicName}>BS. {params.vetName || "Chưa rõ bác sĩ"}</Text>
            <Text style={styles.prescriptionDate}>Ngày khám: {params.date}</Text>
          </View>
        </View>

        {/* Khối 2: Thông tin lâm sàng */}
        <Text style={styles.sectionTitle}>Thông tin chung</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Mã bệnh án:</Text>
            <Text style={styles.infoValue}>#{params.id}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Cân nặng:</Text>
            <Text style={styles.infoValue}>{params.weight ? `${params.weight} kg` : "Chưa cân"}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRowVertical}>
            <Text style={styles.infoLabel}>Triệu chứng lâm sàng:</Text>
            <Text style={styles.infoValueLong}>{params.symptoms || "Không ghi nhận"}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRowVertical}>
            <Text style={[styles.infoLabel, { color: Colors.red }]}>Chẩn đoán bệnh *:</Text>
            <Text style={[styles.infoValueLong, { fontWeight: '500', color: Colors.text }]}>
              {params.diagnosis || "Chưa có chẩn đoán"}
            </Text>
          </View>
        </View>

        {/* Khối 3: Toa thuốc chỉ định từ Database động */}
        <Text style={styles.sectionTitle}>Toa thuốc chỉ định</Text>
        <View style={styles.medicationList}>
          {displayMedications.length === 0 ? (
            <View style={styles.emptyMedication}>
              <Text style={styles.emptyText}>Không có thuốc chỉ định cho ca này.</Text>
            </View>
          ) : (
            displayMedications.map((item, index) => (
              <MedicationCard
                key={item.id || index} 
                name={item.medication_name} 
                dose={item.dosage}           
                days={item.duration}       
                type="pill"                 
              />
            ))
          )}
        </View>

        {/* Khối 4: Ghi chú dặn dò */}
        <Text style={styles.sectionTitle}>Ghi chú dặn dò (Vet Notes)</Text>
        <View style={styles.notesCard}>
          <Text style={styles.notesText}>{params.notes || "Không có dặn dò nào thêm."}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#F8F9FA' },
  scrollView: { flex: 1 },
  contentContainer: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40 },
  clinicCard: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 20, padding: 16, alignItems: 'center', marginBottom: 20 },
  clinicIconCircle: { width: 48, height: 48, borderRadius: 24, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center' },
  clinicInfo: { marginLeft: 14 },
  clinicName: { fontSize: 16, fontWeight: '600', color: '#1A1A1A' },
  prescriptionDate: { fontSize: 13, color: '#8E8E93', marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#555555', marginBottom: 10, marginLeft: 4 },
  infoCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 16, marginBottom: 24 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 },
  infoRowVertical: { paddingVertical: 12 },
  infoLabel: { fontSize: 15, color: '#757575', fontWeight: '400' },
  infoValue: { fontSize: 16, fontWeight: '500', color: '#1A1A1A' },
  infoValueLong: { fontSize: 16, color: '#444444', marginTop: 6, lineHeight: 22 },
  divider: { height: 1, backgroundColor: '#F0F0F0' },
  medicationList: { marginBottom: 24 },
  notesCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 16 },
  notesText: { fontSize: 15, color: '#444444', lineHeight: 22 },
  emptyMedication: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, alignItems: 'center' },
  emptyText: { color: '#8E8E93', fontSize: 14 }
});