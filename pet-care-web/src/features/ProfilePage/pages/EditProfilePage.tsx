import Sidebar from "../../../shared/components/Sidebar";
import { Colors } from "../../../constants/Colors";
import CommonButton from "../../../shared/components/CommonButton";
import React, { useEffect, useState } from "react";
import EditProfileSpecialties from "../components/EditProfilePage/EditProfileSpecialties";
import EditProfileContactInfo from "../components/EditProfilePage/EditProfileContactInfo";
import EditProfileBasicInfo from "../components/EditProfilePage/EditProfileBasicInfo";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../services/profileService";
import CommonMessage from "../../../shared/components/CommonMessage";
import { getProfile } from "../../../api/UserApi";

function EditProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState<{
    type: "error" | "success" | "warning" | "info";
    text: string;
  } | null>(null);

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    role: "",
    bio: "",
    avatar: null as File | null,
    tags: [],
    phone: "",
    dob: "",
    address: "",
    clinicRoom: "",
  });
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getProfile();

        setUser(data);

        setForm({
          name: data.full_name || "",
          role: data.role || "",
          bio: data.doctorProfile?.bio || "",
          avatar: data.avatar_url || "https://link-anh-mac-dinh.jpg",
          tags:
            typeof data.doctorProfile?.tags === "string"
              ? data.doctorProfile.tags
                  .split(",")
                  .map((t: string) => t.trim())
                  .filter((t: string) => t !== "")
              : Array.isArray(data.doctorProfile?.tags)
                ? data.doctorProfile.tags
                : [],
          phone: data.phone || "",
          dob: data.date_of_birth
            ? new Date(data.date_of_birth).toISOString().split("T")[0]
            : "",
          address: data.address || "",
          clinicRoom: data.doctorProfile?.clinic_room || "",
        });
      } catch (error) {
        console.error("Lỗi khi lấy thông tin profile:", error);
      }
    };

    loadData();
  }, []);

  const [newTag, setNewTag] = useState("");

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleFileChange = (file: File) => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setForm((prev) => ({
        ...prev,
        avatar: previewUrl,
        avatarFile: file,
      }));
    }
  };

  const handleUpdate = async () => {
    console.log("DOB: " + form.dob);

    try {
      setLoading(true);
      setMessage(null);

      const phoneRegex = /^0\d{9}$/;
      if (!phoneRegex.test(form.phone)) {
        setMessage({
          type: "error",
          text: "Phone number must have 10 digits and start with 0!",
        });
        return;
      }

      if (form.dob) {
        const selectedYear = new Date(form.dob).getFullYear();
        const currentYear = new Date().getFullYear();

        if (selectedYear <= 1900 || selectedYear >= currentYear) {
          setMessage({
            type: "error",
            text:
              "Year of birth must be greater than 1900 and less than the current year" +
              currentYear,
          });
          return;
        }
      } else {
        setMessage({ type: "error", text: "Date of birth cannot be empty" });
        return;
      }

      const data = new FormData();
      data.append("full_name", form.name);
      data.append("phone", form.phone);
      data.append("address", form.address);
      data.append("date_of_birth", form.dob);
      if (form.avatarFile) {
        data.append("file", form.avatarFile);
      }
      data.append("bio", form.bio);
      data.append("clinic_room", form.clinicRoom);
      data.append(
        "tags",
        Array.isArray(form.tags) ? form.tags.join(", ") : form.tags,
      );

      console.log(form.avatarFile);
      console.log(form.dob);
      const res = await updateProfile(data);

      if (res.status === 200 || res.status === 201) {
        alert("Cập nhật thành công");
        if (setUser) setUser(res.data);
        navigate("/profile");
      }
    } catch (error) {
      console.error("Lỗi :", error);
      alert("Có lỗi xảy ra khi cập nhật");
    }
  };
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: "flex",
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
        <EditProfileBasicInfo
          form={form}
          handleChange={handleChange}
          setForm={setForm}
          handleFileChange={handleFileChange}
        />
        <EditProfileSpecialties
          form={form}
          setForm={setForm}
          newTag={newTag}
          setNewTag={setNewTag}
        />
        <EditProfileContactInfo form={form} handleChange={handleChange} />
        {message && (
          <CommonMessage type={message.type} message={message.text} />
        )}

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
            onClick={handleUpdate}
          />
        </div>
      </main>
    </div>
  );
}

export default EditProfilePage;
