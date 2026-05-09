import { useEffect, useState } from "react";
import { Colors } from "../../../constants/Colors";
import Sidebar from "../../../shared/components/Sidebar";
import PetBasicInfo from "../components/PetBasicInfo";
import PetHealthInfo from "../components/PetHealthInfo";
import type { Pet } from "../types/Pet";
import CommonButton from "../../../shared/components/CommonButton";
import { MdCreate } from "react-icons/md";
import type { Breed } from "../types/Breed";
import { createPet, getAllBreed } from "../services/petService";
import { useNavigate } from "react-router-dom";

function NewPetPage(){
    const [breeds, setBreeds] = useState<Breed[]>([]);
      const navigate = useNavigate();

    
     const [form, setForm] = useState<Pet>({
        avatar_url: "",
        name: "",
        species: "",
        gender: "",
        breed_id: 0,
        height: 0,
        weight: 0,
        dob: "",
        neutered: "",
        allergies: []
    })

    useEffect(()=>{
        const loadData = async () => {
            const breedsData = await getAllBreed();
            setBreeds(breedsData);
        }
        loadData();
    },[])

    const handleSubmit = async () => {
        console.log("Đang tiến hành submit...");
        if (form.dob) {
              const currentYear = new Date().getFullYear();
              const selectedYear = new Date(form.dob).getFullYear();
        
              if (currentYear - selectedYear > 20) {
                alert("Ngày sinh không hợp lệ (Pet không thể thọ quá 20 tuổi)!");
                return; 
              }
           
            }
            // console.log("");
        
            try {
              const dataForm = new FormData();
              dataForm.append("name", form.name);
              dataForm.append("species", form.species);
              dataForm.append("breed_id", String(form.breed_id));
              dataForm.append("gender", form.gender);
              dataForm.append("date_of_birth", form.dob);
              dataForm.append("weight", String(form.weight || 0));
              dataForm.append("height", String(form.height || 0)); 
              dataForm.append("avatar_url", form.avatar_url);
        
              dataForm.append("neutered", String(form.neutered));
              console.log("Neutered: " + String(form.neutered));
        
              dataForm.append(
                "allergies",
                Array.isArray(form.allergies)
                  ? form.allergies.join(", ")
                  : String(form.allergies || ""),
              );
        
              const res = await createPet(dataForm);
        
              if (res && (res.status === 200 || res.status === 201)) {
                alert("Cập nhật thành công!");
                navigate("/pets");
              } else {
                alert("Cập nhật thất bại, bạn hãy kiểm tra lại nhé!");
              }
            } catch (error) {
              console.error("Lỗi khi update:", error);
              alert("Đã có lỗi xảy ra khi kết nối server!");
            }
    }
    return(
        <div style={styles.container}>
            <Sidebar />

            <main style={styles.main}>
                <PetBasicInfo form={form} setForm={setForm} breeds={breeds}/>
                <PetHealthInfo form={form} setForm={setForm}/>

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20}}>
                    <CommonButton 
                        title="Create"
                        Icon={MdCreate}
                        onClick={handleSubmit}
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