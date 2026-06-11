import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import HeaderBar from '@/app/shared/components/HeaderBar';
import { Colors } from '@/app/constants/Colors';
import MedicationCard from '../components/MedicationCard';

// Kiểu dữ liệu cho từng loại thuốc trong đơn
interface Medication {
  id: string;
  name: string;
  dose: string;
  days: number;
  type: 'pill' | 'injection';
}

// Kiểu dữ liệu cho toàn bộ thông tin chi tiết đơn thuốc
interface PrescriptionDetail {
  id: string;
  petName: string;
  weight: string;
  symptoms: string;
  diagnosis: string;
  medications: Medication[];
  vetNotes: string;
  date: string;
}

export default function DocumentDetailPage() {
    const router = useRouter();

  const prescription: PrescriptionDetail = {
    id: 'PRES-2025-001',
    petName: 'Bơ (user)',
    weight: '4.5 kg',
    symptoms: 'Nôn mửa nhẹ, mệt mỏi, bỏ ăn từ tối qua.',
    diagnosis: 'Viêm dạ dày ruột cấp tính (Acute Gastroenteritis)',
    date: '14 Sep, 2025',
    medications: [
      {
        id: '1',
        name: 'Nestalin 220',
        dose: '1 viên/ngày, sau ăn',
        days: 5,
        type: 'pill',
      },
      {
        id: '2',
        name: 'Rabies 1 dose',
        dose: '1 liều, tiêm dưới da',
        days: 1,
        type: 'injection',
      },
      {
        id: '3',
        name: 'Prednsone 220',
        dose: '1/2 viên/ngày, uống sáng',
        days: 3,
        type: 'pill',
      },
    ],
    vetNotes: 'Cho thú cưng ăn cháo loãng, kiêng dầu mỡ. Tái khám sau 3 ngày nếu triệu chứng không giảm hoặc có biểu hiện lờ đờ hơn.',
  };

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
        
        <View style={styles.clinicCard}>
          <View style={styles.clinicIconCircle}>
            <Ionicons name="medical" size={24} color={Colors.primary} />
          </View>
          <View style={styles.clinicInfo}>
            <Text style={styles.prescriptionDate}>Ngày khám: {prescription.date}  </Text>
          </View>
        </View>

        {/* Khối 2: Thông tin Bệnh nhân (Thú cưng) */}
        <Text style={styles.sectionTitle}>Thông tin chung</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Bệnh nhân:</Text>
            <Text style={styles.infoValue}>{prescription.petName}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Cân nặng (kg):</Text>
            <Text style={styles.infoValue}>{prescription.weight}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRowVertical}>
            <Text style={styles.infoLabel}>Triệu chứng lâm sàng:</Text>
            <Text style={styles.infoValueLong}>{prescription.symptoms}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRowVertical}>
            <Text style={[styles.infoLabel, { color: Colors.red }]}>Chẩn đoán bệnh *:</Text>
            <Text style={[styles.infoValueLong, { fontWeight: '500', color: Colors.text }]}>
              {prescription.diagnosis}
            </Text>
          </View>
        </View>

        {/* Khối 3: Toa thuốc chỉ định */}
        <Text style={styles.sectionTitle}>Toa thuốc chỉ định</Text>
        <View style={styles.medicationList}>
            {prescription.medications.map((item) => (
                <MedicationCard
                    key={item.id} 
                    name={item.name}
                    dose={item.dose}
                    days={item.days}
                    type={item.type}
                />
            ))}
        </View>

        {/* Khối 4: Ghi chú dặn dò (Vet Notes) */}
        <Text style={styles.sectionTitle}>Ghi chú dặn dò (Vet Notes)</Text>
        <View style={styles.notesCard}>
          <Text style={styles.notesText}>{prescription.vetNotes}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  clinicCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  clinicIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clinicInfo: {
    marginLeft: 14,
  },
  clinicName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  prescriptionDate: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555555',
    marginBottom: 10,
    marginLeft: 4,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  infoRowVertical: {
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 15,
    color: '#757575',
    fontWeight: '400',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  infoValueLong: {
    fontSize: 16,
    color: '#444444',
    marginTop: 6,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  medicationList: {
    marginBottom: 24,
  },
  notesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
  },
  notesText: {
    fontSize: 15,
    color: '#444444',
    lineHeight: 22,
  },
});
