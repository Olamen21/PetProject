import Sidebar from "../../../shared/components/Sidebar";
import { Colors } from "../../../constants/Colors";
import { useEffect, useState } from "react";
import VaccineHeader from "../components/VaccineHeader";
import VaccineTable from "../components/VaccineTable";
import type { Vaccine } from "../types/Vaccine";
import { mockVaccines } from "../data/MockData";
import { getAllVaccine } from "../services/vaccineService";

const VaccinePage: React.FC = () => {
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const dataVaccine = await getAllVaccine();
      setVaccines(dataVaccine);
      setLoading(false);
    } catch (err: any) {
      setError("Không thể tải dữ liệu vaccine");
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadData();
    };
    fetchData();
  }, []);

  const filteredVaccines = vaccines.filter((v) =>
    v.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <div style={styles.table}>
          <VaccineHeader
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          {loading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              Đang tải dữ liệu...
            </div>
          ) : error ? (
            <div style={{ color: "red", textAlign: "center", padding: "20px" }}>
              {error}
            </div>
          ) : (
            <VaccineTable vaccines={filteredVaccines} onDeleted={loadData} />
          )}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    background: Colors.background,
    minHeight: "100vh",
  },
  content: {
    flex: 1,
    padding: 30,
  },
  table: {
    background: Colors.white,
    borderRadius: 16,
    padding: 24,
    boxShadow: "0 6px 16px rgba(0,0,0,0.05)",
    overflowX: "auto",
  },
};

export default VaccinePage;
