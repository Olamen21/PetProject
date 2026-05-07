import Sidebar from "../../../shared/components/Sidebar";
import PetBasicInfo from "../components/PetBasicInfo";
import PetHealthInfo from "../components/PetHealthInfo";
import CommonButton from "../../../shared/components/CommonButton";
import { MdCreate } from "react-icons/md";
import { Colors } from "../../../constants/Colors";
import {  useParams  } from "react-router-dom";
import { useState } from "react";
import type { Pet } from "../types/Pet";
import { mockPets } from "./mockdata";

function EditPetPage() {
    const { id } = useParams<{ id: string }>();
    const petData = mockPets.find((p) => p.id === id);
  
    const [form, setForm] = useState<Pet>(
        petData || {
        id: Date.now().toString() + Math.floor(Math.random() * 1000).toString(),
        image: "",
        name: "",
        species: "",
        gender: "",
        breed: "",
        height: 0,
        weight: 0,
        dob: "",
        neutered_status: "",
        allergies: []
        }
    );

    return(
        <div style={styles.container}>
            <Sidebar />

            <main style={styles.main}>
                <PetBasicInfo form={form} setForm={setForm}/>
                <PetHealthInfo form={form} setForm={setForm}/>

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20}}>
                    <CommonButton 
                        title="Update"
                        Icon={MdCreate}
                        onClick={()=>{}}
                        textColor= {Colors.white}
                    />
                </div>
            </main>
        </div>
    );
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
}
export default EditPetPage;