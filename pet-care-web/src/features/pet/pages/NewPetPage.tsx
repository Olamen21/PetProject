import { useState } from "react";
import { Colors } from "../../../constants/Colors";
import Sidebar from "../../../shared/components/Sidebar";
import PetBasicInfo from "../components/PetBasicInfo";
import PetHealthInfo from "../components/PetHealthInfo";
import type { Pet } from "../types/Pet";
import CommonButton from "../../../shared/components/CommonButton";
import { MdCreate } from "react-icons/md";

function NewPetPage(){
     const [form, setForm] = useState<Pet>({
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
    })
    return(
        <div style={styles.container}>
            <Sidebar />

            <main style={styles.main}>
                <PetBasicInfo form={form} setForm={setForm}/>
                <PetHealthInfo form={form} setForm={setForm}/>

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20}}>
                    <CommonButton 
                        title="Create"
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

export default NewPetPage;