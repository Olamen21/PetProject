import { useEffect, useState } from "react";
import { Colors } from "../../../constants/Colors";
import Sidebar from "../../../shared/components/Sidebar";
import PetHeader from "../components/PetHeader";
import PetTable from "../components/PetTable";
import type { Pet } from "../types/Pet";
import { mockPets } from "./mockdata";

const PetListPage: React.FC = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setPets(mockPets);
        setLoading(false);
    }, []);

    const filteredPets = pets.filter(
        (p) =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.breed?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return(
        <div style={styles.container}>
            <Sidebar />
            <div style={styles.content}>
                <div style={styles.table}>
                    <PetHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

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
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
        background: Colors.background,
        minHeight: "100vh",
    },
    content: { 
        flex: 1, 
        padding: 30 
    },
    table: {
        background: Colors.white,
        borderRadius: 16,
        padding: 24,
        boxShadow: "0 6px 16px rgba(0,0,0,0.05)",
        overflowX: "auto",
    }
}

export default PetListPage;