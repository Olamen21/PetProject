import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Vaccine } from "../types/Vaccine";
import { mockVaccines } from "../data/MockData";
import { Colors } from "../../../constants/Colors";
import Sidebar from "../../../shared/components/Sidebar";
import VaccineInfo from "../components/VaccineInfo";
import CommonButton from "../../../shared/components/CommonButton";
import { MdCreate } from "react-icons/md";

function EditVaccine() {
    const {id} = useParams<{ id: string}>();
    const navigate = useNavigate();

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

    const handleSubmit = () => {
        console.log("Đang tiếng hành submit...");
        navigate("/vaccines")
    }

    return (
        <div style={styles.container}>
            <Sidebar />

            <main style={styles.main}>
                <VaccineInfo form={form} setForm={setForm} />

                <div 
                    style={{ display: "flex", justifyContent: "flex-end", marginTop: 20}}
                >
                    <CommonButton 
                        title="Update"
                        Icon={MdCreate}
                        onClick={handleSubmit}
                        textColor={Colors.white}
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

export default EditVaccine;