import { useEffect, useState } from "react";
import { Colors } from "../../../constants/Colors";
import Sidebar from "../../../shared/components/Sidebar";
import VaccineSection from "../components/VaccineSection";
import AppointmentSection from "../components/AppointmentSection";
import PetDetailModal from "../components/PetDetailModal";
import DiagnosisFormModal from "../components/DiagnosisFormModal"; 

export default function DiagnosisPage() {
  const [vaccines, setVaccines] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  
  const [selectedPet, setSelectedPet] = useState<any | null>(null);
  const [diagnosisPet, setDiagnosisPet] = useState<any | null>(null); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setVaccines([
        { id: 1, petName: "Miu Miu", ownerName: "Nguyễn Văn A", vaccineName: "Dại", species: "Cat", status: "PENDING", userNote: "Mèo hơi nhát, sợ người lạ" },
        { id: 2, petName: "LuLu", ownerName: "Trần Thị B", vaccineName: "4 Bệnh", species: "Dog", status: "PENDING", userNote: "Cún năng động, không kén thuốc" }
      ]);
      setAppointments([
        { id: 101, petName: "Gấu Corgi", ownerName: "Lê Văn C", reason: "Khám da liễu", status: "CONFIRM", userNote: "Bị rụng lông nhiều vùng tai, ngứa ngáy liên tục" }
      ]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleCompleteVaccine = (id: number) => {
    setVaccines(prev => prev.map(v => v.id === id ? { ...v, status: "COMPLETED" } : v));
    alert("Đã hoàn thành tiêm vắc-xin!");
  };

  const handleSaveDiagnosis = (id: number, diagnosisData: { condition: string; prescription: string }) => {
    console.log("Lưu thông tin bệnh án cho ca hẹn:", id, diagnosisData);
    
    alert(`Lưu hồ sơ bệnh án thành công cho thú cưng!\n- Bệnh lý: ${diagnosisData.condition}\n- Đơn thuốc: ${diagnosisData.prescription}`);
    
    setAppointments(prev => prev.filter(item => item.id !== id));
  };

  const filteredVaccines = vaccines.filter(v => v.petName.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredAppointments = appointments.filter(a => a.petName.toLowerCase().includes(searchTerm.toLowerCase()));

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
        <PetDetailModal pet={selectedPet} onClose={() => setSelectedPet(null)} />
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
  container: { display: "flex", background: Colors.background, minHeight: "100vh" },
  content: { flex: 1, padding: 30, display: "flex", flexDirection: "column", gap: 20 },
  searchHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  pageTitle: { fontSize: 26, fontWeight: 700, color: Colors.text, margin: 0 },
  globalSearch: { background: Colors.white, border: `1px solid ${Colors.border}`, borderRadius: 10, padding: "10px 16px", width: 300, outline: "none", fontSize: 14 },
  gridColumns: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" },
  columnCard: { background: Colors.white, borderRadius: 16, padding: 20, boxShadow: "0 6px 16px rgba(0,0,0,0.03)" },
  centerText: { textAlign: "center", padding: "40px", fontSize: 16, color: Colors.text_secondary }
};