import Sidebar from "../../../shared/components/Sidebar";
import PetBasicInfo from "../components/PetBasicInfo";
import PetHealthInfo from "../components/PetHealthInfo";
import CommonButton from "../../../shared/components/CommonButton";
import { MdCreate } from "react-icons/md";
import { Colors } from "../../../constants/Colors";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Pet } from "../types/Pet";
import { getPetById, getAllBreed, updatePet } from "../services/petService";
import type { Breed } from "../types/Breed";
import { useNavigate } from "react-router-dom";
export interface PetForm extends Pet {
  imageFile?: File;
}

function EditPetPage() {
  const { id } = useParams<{ id: string }>();
  // const petData = mockPets.find((p) => p.id === id);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const navigate = useNavigate();

  const [form, setForm] = useState<PetForm>({
    avatar_url: "",
    name: "",
    species: "",
    gender: "",
    breed_id: 0,
    height: 0,
    weight: 0,
    dob: "",
    neutered: "",
    allergies: [],
  });

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const breedsData = await getAllBreed();
        setBreeds(breedsData);

        const data = await getPetById(id ?? "");
        setForm({
          ...data,
          breed_id: data.breed_id,
          dob: data.date_of_birth
            ? new Date(data.date_of_birth).toISOString().split("T")[0]
            : "",
          allergies:
            typeof data.allergies === "string"
              ? data.allergies.split(",").map((item: string) => item.trim())
              : Array.isArray(data.allergies)
                ? data.allergies
                : [],
        });
        console.log("img:" + data.avatar_url);
      } catch (error) {
        console.error("Lỗi load data:", error);
      }
    };
    loadInitialData();
  }, [id]);

  const handleSubmit = async () => {
    console.log("Đang tiến hành submit...");
    console.log(form.avatar_url);

    if (form.dob) {
      const currentYear = new Date().getFullYear();
      const selectedYear = new Date(form.dob).getFullYear();

      if (currentYear - selectedYear > 20) {
        alert("Ngày sinh không hợp lệ (Pet không thể thọ quá 20 tuổi)!");
        return;
      }
    }
    console.log(form.avatar_url);

    try {
      const dataForm = new FormData();
      dataForm.append("name", form.name);
      dataForm.append("species", form.species);
      dataForm.append("breed_id", String(form.breed_id));
      dataForm.append("gender", form.gender);
      dataForm.append("date_of_birth", form.dob);
      dataForm.append("weight", String(form.weight || 0));
      dataForm.append("height", String(form.height || 0));
      if (form.imageFile) {
        dataForm.append("file", form.imageFile);
      }

      dataForm.append("neutered", String(form.neutered));
      console.log("Neutered: " + String(form.neutered));

      dataForm.append(
        "allergies",
        Array.isArray(form.allergies)
          ? form.allergies.join(", ")
          : String(form.allergies || ""),
      );

      const res = await updatePet(dataForm, id ?? "");

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
  };

  return (
    <div style={styles.container}>
      <Sidebar />

      <main style={styles.main}>
        <PetBasicInfo form={form} setForm={setForm} breeds={breeds} />
        <PetHealthInfo form={form} setForm={setForm} />

        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}
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
};
export default EditPetPage;
