import Sidebar from "../../../shared/components/Sidebar";
import { Colors } from "../../../constants/Colors";
import CommonButton from "../../../shared/components/CommonButton";
import CommonTextInput from "../../../shared/components/CommonTextInput";

import { FiUser, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { useState } from "react";
import EditProfileContactInfo from "../components/EditProfileContactInfo";
import EditProfileSpecialties from "../components/EditProfileSpecialties";
import EditProfileBasicInfo from "../components/EditProfileBasicInfo";

function EditProfilePage() {
  const [form, setForm] = useState({
    name: "BS. Tran Thi Huong",
    role: "Veterinarian — Internal Medicine & Diagnostic Imaging",
    avatar:
      "https://www.shutterstock.com/image-photo/portrait-asian-female-doctor-wearing-260nw-2502070973.jpg",

    tags: ["Dogs & Cats", "Ultrasound", "Dermatology"],

    email: "tranhuong@petcare.vn",
    phone: "0909 876 543",
    dob: "1985-10-12",
    address: "PetCare Veterinary Hospital, Da Nang",
    city: "Da Nang",
  });

  const [newTag, setNewTag] = useState("");

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

 

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: "flex",
      paddingLeft: 300,
      background: Colors.background,
    },
    main: {
      flex: 1,
      padding: "24px",
    },

    footer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 10,
      marginTop: 20,
    },
  };

  return (
    <div style={styles.container}>
      <Sidebar />

      <main style={styles.main}>
        
        <EditProfileBasicInfo form={form} handleChange={handleChange} setForm={setForm} />
        <EditProfileSpecialties form={form} setForm={setForm} newTag={newTag} setNewTag={setNewTag} />
        <EditProfileContactInfo form={form} handleChange={handleChange} />


     
       

        {/* 🔹 BUTTON */}
        <div style={styles.footer}>
          <CommonButton
            title="Cancel"
            backgroundColor="#ccc"
            onClick={() => window.history.back()}
          />

          <CommonButton
            title="Save Changes"
            backgroundColor={Colors.primary}
            textColor={Colors.white}
            onClick={() => console.log(form)}
          />
        </div>
      </main>
    </div>
  );
}

export default EditProfilePage;