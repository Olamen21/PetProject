import { useEffect, useState } from "react";
import { Colors } from "../../../constants/Colors";
import Sidebar from "../../../shared/components/Sidebar";
import VaccineSection from "../components/VaccineSection";
import AppointmentSection from "../components/AppointmentSection";
import PetDetailModal from "../components/PetDetailModal";
import DiagnosisFormModal from "../components/DiagnosisFormModal";
import {
  cancelVaccine,
  getAllPet,
  getAllPetVaccine,
  getAllVaccine,
  getAppointmentByVetId,
  markCompleteVaccine,
  createMedicalRecord,
  markCompleteAppointment,
} from "../services/DiagnosisService";
import type { PetVaccine } from "../types/PetVaccine";
import { getAllUser, getProfile } from "../../../api/UserApi";
import type { Vaccine } from "../types/Vaccine";
import type { Pet } from "../types/Pet";
import type { User } from "../types/User";
import type { Appointment } from "../types/Appointment";
import type { DiagnosisData } from "../types/DiagnosisData";

export default function DiagnosisPage() {
  const [vaccinePets, setVaccinePets] = useState<PetVaccine[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [diagnosisAppointment, setDiagnosisAppointment] =
    useState<Appointment | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const petVaccines = await getAllPetVaccine();
      const pets = await getAllPet();
      const users = await getAllUser();
      const vaccines = await getAllVaccine();

      const mergedData: PetVaccine[] = petVaccines.map((pv: PetVaccine) => {
        const pet = pets.find((p: Pet) => p.id === pv.pet_id);
        const owner = users.find((u: User) => u.id === pet?.owner_id);
        const vaccine = vaccines.find((v: Vaccine) => v.id === pv.vaccine_id);

        return {
          id: pv.id,
          pet_name: pet?.name ?? "Unknown Pet",
          owner_name: owner?.full_name ?? "Unknown Owner",
          vaccine_name: vaccine?.name ?? "Unknown Vaccine",
          species: vaccine?.target_species ?? pet?.species ?? "",
          scheduled_date: pv.scheduled_date,
          status: pv.status,
          note: pv.note ?? "",
        };
      });

      setVaccinePets(mergedData);
      const userData = await getProfile();
      const getAppointmentData = await getAppointmentByVetId(userData.id);
      const mergedAppointments = getAppointmentData.map((apt: Appointment) => {
        const pet = pets.find((p: Pet) => p.id === apt.pet_id);
        const owner = users.find((u: User) => u.id === pet?.owner_id);
        return {
          id: apt.id,
          pet_name: pet?.name ?? "Unknown Pet",
          owner_name: owner?.full_name ?? "Unknown Owner",
          note: apt.user_note ?? "No reason provided",
          status: apt.status,
        };
      });
      setAppointments(mergedAppointments);
      console.log("Merged Appointments:", mergedAppointments);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleCompleteVaccine = async (id: number) => {
    const markCompleteData = await markCompleteVaccine(id);
    if (markCompleteData) {
      alert("Đã đánh dấu lịch tiêm vắc-xin hoàn thành!");
      setVaccinePets(
        vaccinePets.map((v) =>
          v.id === id ? { ...v, status: "COMPLETED" } : v,
        ),
      );
    } else {
      alert("Đánh dấu hoàn thành thất bại. Vui lòng thử lại.");
    }
  };
  const handleCancelVaccine = async (id: number) => {
    const cancelData = await cancelVaccine(id);
    if (cancelData) {
      alert("Đã hủy lịch tiêm vắc-xin!");
      setVaccinePets(vaccinePets.filter((v) => v.id !== id));
    } else {
      alert("Hủy lịch tiêm vắc-xin thất bại. Vui lòng thử lại.");
    }
  };

 const handleSaveDiagnosis = async (
  id: number,
  diagnosisData: DiagnosisData,
) => {
  console.log("Lưu thông tin bệnh án cho ca hẹn:", id, diagnosisData);

  try {
    const data = {
      pet_id: id,
      appointment_id: diagnosisData.appointment_id,
      symptoms: diagnosisData.symptoms,
      diagnosis: diagnosisData.diagnosis,
      weight_at_exam: diagnosisData.weight_at_exam ? Number(diagnosisData.weight_at_exam) : null,
      vet_notes: diagnosisData.vet_notes,
      medications: diagnosisData.medications 
    };

    const res = await createMedicalRecord(data);
    
    await markCompleteAppointment(diagnosisData.appointment_id);

    if (res && (res.status === 200 || res.status === 201)) {
      alert("Cập nhật thành công!");
      setAppointments(appointments.filter((v) => v.id !== id));
    } else {
      alert("Cập nhật thất bại, bạn hãy kiểm tra lại nhé!");
    }
  } catch (error) {
    console.error("Lỗi khi update:", error);
    alert("Đã có lỗi xảy ra khi kết nối server!");
  }
};

  const filteredVaccines = vaccinePets.filter(
    (v: PetVaccine) =>
      v.pet_name && v.pet_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const filteredAppointments = appointments.filter(
    (a: Appointment) =>
      a.pet_name && a.pet_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <div style={styles.searchHeader}>
          <h1 style={styles.pageTitle}>Diagnosis Dashboard</h1>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by pet name..."
            style={styles.globalSearch}
          />
        </div>

        {loading ? (
          <div style={styles.centerText}>Đang tải dữ liệu chẩn đoán...</div>
        ) : (
          <div style={styles.gridColumns}>
            <div style={styles.columnCard}>
              <VaccineSection
                vaccines={filteredVaccines}
                onComplete={handleCompleteVaccine}
                onRowClick={(pet) => setSelectedPet(pet)}
                onCancel={handleCancelVaccine}
              />
            </div>

            <div style={styles.columnCard}>
              <AppointmentSection
                appointments={filteredAppointments}
                onRowClick={(pet) => setSelectedPet(pet)}
                onOpenDiagnosis={(appointment) => setDiagnosisAppointment(appointment)}
              />
            </div>
          </div>
        )}
      </div>

      {selectedPet && (
        <PetDetailModal
          pet={selectedPet}
          onClose={() => setSelectedPet(null)}
        />
      )}

      {diagnosisAppointment && (
        <DiagnosisFormModal
          appointment={diagnosisAppointment}
          onClose={() => setDiagnosisAppointment(null)}
          onSave={handleSaveDiagnosis}
        />
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    background: Colors.background,
    minHeight: "100vh",
  },
  content: {
    flex: 1,
    padding: 30,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  searchHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pageTitle: { fontSize: 26, fontWeight: 700, color: Colors.text, margin: 0 },
  globalSearch: {
    background: Colors.white,
    border: `1px solid ${Colors.border}`,
    borderRadius: 10,
    padding: "10px 16px",
    width: 300,
    outline: "none",
    fontSize: 14,
  },
  gridColumns: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 24,
    alignItems: "start",
  },
  columnCard: {
    background: Colors.white,
    borderRadius: 16,
    padding: 20,
    boxShadow: "0 6px 16px rgba(0,0,0,0.03)",
  },
  centerText: {
    textAlign: "center",
    padding: "40px",
    fontSize: 16,
    color: Colors.text_secondary,
  },
};
