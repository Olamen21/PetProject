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
  markComplete,
} from "../services/DiagnosisService";
import type { PetVaccine } from "../types/PetVaccine";
import { getAllUser } from "../../../api/UserApi";
import type { Vaccine } from "../types/Vaccine";
import type { Pet } from "../types/Pet";
import type { User } from "../types/User";

export default function DiagnosisPage() {
  const [vaccinePets, setVaccinePets] = useState<PetVaccine[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [diagnosisPet, setDiagnosisPet] = useState<Pet | null>(null);

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
      setAppointments([
        {
          id: 101,
          pet_name: "Gấu Corgi",
          owner_name: "Lê Văn C",
          reason: "Khám da liễu",
          status: "CONFIRM",
          note: "Bị rụng lông nhiều vùng tai, ngứa ngáy liên tục",
        },
      ]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleCompleteVaccine = async (id: number) => {
    const markCompleteData = await markComplete(id);
    alert("Đã hoàn thành tiêm vắc-xin!");
    window.location.reload();
  };
  const handleCancelVaccine = async (id: number) => {
    const cancelData = await cancelVaccine(id);
    alert("Đã hủy lịch tiêm vắc-xin!");
    window.location.reload();
  };

  const handleSaveDiagnosis = (
    id: number,
    diagnosisData: { condition: string; prescription: string },
  ) => {
    console.log("Lưu thông tin bệnh án cho ca hẹn:", id, diagnosisData);

    alert(
      `Lưu hồ sơ bệnh án thành công cho thú cưng!\n- Bệnh lý: ${diagnosisData.condition}\n- Đơn thuốc: ${diagnosisData.prescription}`,
    );

    setAppointments((prev) => prev.filter((item) => item.id !== id));
  };

  // const filteredVaccines = vaccines.filter((v: PetVaccine) => v.petName && v.petName.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredAppointments = appointments.filter(
    (a: any) =>
      a.petName && a.petName.toLowerCase().includes(searchTerm.toLowerCase()),
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
                vaccines={vaccinePets}
                onComplete={handleCompleteVaccine}
                onRowClick={(pet) => setSelectedPet(pet)}
                onCancel={handleCancelVaccine}
              />
            </div>

            <div style={styles.columnCard}>
              <AppointmentSection
                appointments={filteredAppointments}
                onRowClick={(pet) => setSelectedPet(pet)}
                onOpenDiagnosis={(pet) => setDiagnosisPet(pet)}
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

      {diagnosisPet && (
        <DiagnosisFormModal
          pet={diagnosisPet}
          onClose={() => setDiagnosisPet(null)}
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
