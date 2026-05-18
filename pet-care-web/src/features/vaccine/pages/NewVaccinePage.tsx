import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Vaccine } from "../types/Vaccine";
import { Colors } from "../../../constants/Colors";
import Sidebar from "../../../shared/components/Sidebar";
import VaccineInfo from "../components/VaccineInfo";
import CommonButton from "../../../shared/components/CommonButton";
import { MdCreate } from "react-icons/md";
import { createVaccine } from "../services/vaccineService";

function NewVaccinePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<Vaccine>({
    name: "",
    quantity: 0,
    target_species: "",
  });

  const handleSubmit = async () => {
    console.log("Đang tiến hành submit..." + form.name + " - " + form.quantity + " - " + form.target_species );
    try {
      if (!form.name || !form.target_species) {
        alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
        return;
      }
      if (form.quantity < 0) {
        alert("Số lượng không thể là số âm!");
        return;
      }
      const dataForm = new FormData();
      dataForm.append("name", form.name);
      dataForm.append("quantity", String(form.quantity));
      dataForm.append("target_species", form.target_species);
      const res = await createVaccine(dataForm);
      if (res && (res.status === 200 || res.status === 201)) {
        alert("Tạo vaccine thành công!");
        navigate("/vaccines");
      } else {
        alert("Tạo vaccine thất bại, bạn hãy kiểm tra lại nhé!");
      }
    } catch (error) {
      console.error("Lỗi khi update:", error);
      alert("Có lỗi xảy ra khi tạo vaccine. Vui lòng thử lại.");
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
            title="Create"
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

export default NewVaccinePage;
