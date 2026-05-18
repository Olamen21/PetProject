import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Vaccine } from "../types/Vaccine";
import { mockVaccines } from "../data/MockData";
import { Colors } from "../../../constants/Colors";
import Sidebar from "../../../shared/components/Sidebar";
import CommonTextInput from "../../../shared/components/CommonTextInput";
import { MdOutlineVaccines } from "react-icons/md";
import { LuDog } from "react-icons/lu";

function DetailVaccine() {
    const {id} = useParams<{ id: string}>();

    const [form, setForm] = useState<Vaccine>({
        name: "",
        quatity: 0,
        target_species: "",
    });

    useEffect(() => {
        if(id) {
            const found = mockVaccines.find((v) => v.id === id);
            if (found) {
                setForm(found);
            }     
        }
    }, [id]);

    return (
        <div style={styles.container}>
            <Sidebar />

            <main style={styles.main}>
                <div style={styles.sectionCard}>
                    <div style={styles.sectionTitle}>Info vaccine</div>
                    <div style={styles.row}>
                        <CommonTextInput 
                            Icon={MdOutlineVaccines}
                            placeholder="Vaccine's Name"
                            value={form.name}
                        />
                    </div>
                    <div style={styles.row}>
                        <CommonTextInput 
                            placeholder="Quatity"
                            value={form.quatity?.toString() ?? ""}
                        />
                    </div>

                    <div style={styles.row}>
                        <CommonTextInput
                            Icon={LuDog}
                            placeholder="Species"
                            value={form.target_species}
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    background: Colors.background,
  },
  main: {
    flex: 1,
    padding: "24px",
  },
  sectionCard: {
    background: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    boxShadow: "0 4px 12px " + Colors.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 16,
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    gap: 10,
  },
};

export default DetailVaccine;