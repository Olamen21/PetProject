import { useEffect, useState } from "react";
import { Colors } from "../../../constants/Colors";
import Sidebar from "../../../shared/components/Sidebar";
import PetHeader from "../components/PetHeader";
import PetTable from "../components/PetTable";
import type { Pet } from "../types/Pet";
import { getAllBreed, getPet } from "../services/petService";
import { getAllUser } from "../../../api/UserApi";
import type { Breed } from "../types/Breed";
import type { User } from "../../../shared/types/User";

const PetListPage: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const users = await getAllUser();
        const breeds = await getAllBreed();
        const dataPet = await getPet();

        const petsWithOwner = dataPet.map((p: Pet) => {
          const ownerUser = users.find((u: User) => u.id === p.owner_id);
          const breedName = breeds.find((y: Breed) => y.id === p.breed_id);
          return {
            ...p,
            owner_name: ownerUser ? ownerUser.full_name : "Không rõ",
            breed_name: breedName ? breedName.name : "không rõ",
          };
        });

        setPets(petsWithOwner);
        setLoading(false);
      } catch (err: unknown) {
        console.error("Lỗi hệ thống:", err);

        const errorObj = err as { response?: { data?: { message?: string } } };
        setError(
          errorObj.response?.data?.message || "Không thể tải dữ liệu thú cưng",
        );
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredPets = pets.filter(
    (p) => p.name?.toLowerCase().includes(searchTerm.toLowerCase()),
    // p.breed?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <div style={styles.table}>
          <PetHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          {loading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              Đang tải dữ liệu...
            </div>
          ) : error ? (
            <div style={{ color: "red", textAlign: "center", padding: "20px" }}>
              {error}
            </div>
          ) : (
            <PetTable pets={filteredPets} />
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

export default PetListPage;
