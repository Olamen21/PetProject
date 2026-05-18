import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Vaccine } from "../types/Vaccine";
import { Colors } from "../../../constants/Colors";
import Sidebar from "../../../shared/components/Sidebar";
import VaccineInfo from "../components/VaccineInfo";
import CommonButton from "../../../shared/components/CommonButton";
import { MdCreate } from "react-icons/md";

function NewVaccinePage() {
    const navigate = useNavigate();

    const [form, setForm] = useState<Vaccine>({
        name: "",
        quatity: 0,
        target_species: "",
    })

    const handleSubmit = async () => {
        console.log("Xử lý submit");
        navigate("/vaccines")
    }

    return (
        <div style={styles.container}>
            <Sidebar />

            <main style={styles.main}>
                <VaccineInfo form={form} setForm={setForm} />

                <div
                    style={{display: "flex", justifyContent: "flex-end", marginTop: 20}}
                >
                    <CommonButton 
                        title="Create"
                        Icon={MdCreate}
                        onClick={handleSubmit}
                        textColor= {Colors.white}
                    />
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
};

export default NewVaccinePage;

