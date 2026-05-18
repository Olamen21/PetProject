import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Vaccine } from "../types/Vaccine";
import { Colors } from "../../../constants/Colors";
import Sidebar from "../../../shared/components/Sidebar";
import VaccineInfo from "../components/VaccineInfo";
import CommonButton from "../../../shared/components/CommonButton";
import { MdCreate } from "react-icons/md";
import { getVaccineById, updateVaccine } from "../services/vaccineService";

function EditVaccine() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<Vaccine>({
    name: "",
    quantity: 0,
    target_species: "",
    max_doses: 1,
  });

  useEffect(() => {
    if (id) {
      getVaccineById(id).then((vaccines) => {
        setForm(vaccines);
      });
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      console.log(
        "Đang tiếng hành submit..." +
          form.name +
          " - " +
          form.quantity +
          " - " +
          form.target_species,
      );
      const dataForm = new FormData();
      dataForm.append("name", form.name);
      dataForm.append("quantity", String(form.quantity));
      dataForm.append("target_species", form.target_species);
      dataForm.append("max_doses", String(form.max_doses));

      const res = await updateVaccine(dataForm, id!);
      if (res && (res.status === 200 || res.status === 201)) {
        alert("Cập nhật thành công!");
        navigate("/vaccines");
      } else {
        alert("Cập nhật thất bại, bạn hãy kiểm tra lại nhé!");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật vaccine:", error);
      alert("Đã có lỗi xảy ra khi cập nhật vaccine. Vui lòng thử lại sau.");
    }
  };

  return (
    <div style={styles.container}>
      <Sidebar />

      <main style={styles.main}>
        <VaccineInfo form={form} setForm={setForm} />

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

export default EditVaccine;
