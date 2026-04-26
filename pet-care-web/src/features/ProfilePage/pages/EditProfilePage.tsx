import Sidebar from "../../../shared/components/Sidebar";
import { Colors } from "../../../constants/Colors";
import CommonButton from "../../../shared/components/CommonButton";
import React, { useEffect, useState } from "react";
import EditProfileSpecialties from "../components/EditProfilePage/EditProfileSpecialties";
import EditProfileContactInfo from "../components/EditProfilePage/EditProfileContactInfo";
import EditProfileBasicInfo from "../components/EditProfilePage/EditProfileBasicInfo";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditProfilePage() {
  const { user, setUser } = useAuth();
  console.log("Dữ liệu User hiện tại:", user);

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    role: "",
    bio: "",
    avatar: "",
    tags: [],
    phone: "",
    dob: "",
    address: "",
    clinicRoom: "",
  });
  useEffect(() => {
    if (user) {
      setForm({
        name: user.full_name || "",
        role: user.role || "",
        bio: user.doctorProfile?.bio || "",
        avatar: user.avatar_url || "https://link-anh-mac-dinh.jpg",
        tags:
          typeof user.doctorProfile?.tags === "string"
            ? user.doctorProfile.tags
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t !== "")
            : Array.isArray(user.doctorProfile?.tags)
              ? user.doctorProfile.tags
              : [],
        phone: user.phone || "",
        dob: user.date_of_birth
          ? new Date(user.date_of_birth).toISOString().split("T")[0]
          : "",
        address: user.address || "",
        clinicRoom: user.doctorProfile?.clinic_room || "",
      });
    }
  }, [user]);

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
    try {
      const phoneRegex = /^09\d{8}$/;
      if (!phoneRegex.test(form.phone)) {
        alert("Số điện thoại phải có 10 chữ số và bắt đầu bằng 09");
        return;
      }

      if (form.dob) {
        const selectedYear = new Date(form.dob).getFullYear();
        const currentYear = new Date().getFullYear();

        if (selectedYear <= 1900 || selectedYear >= currentYear) {
          alert(
            `Năm sinh phải lớn hơn 1900 và nhỏ hơn năm hiện tại (${currentYear})`,
          );
          return;
        }
      } else {
        alert("Không được để trống ngày sinh nha");
        return;
      }

      let finalAvatarUrl = form.avatar;
      if (form.avatarFile) {
        const formData = new FormData();
        formData.append("file", form.avatarFile);
        formData.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        );

        const cloudRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData,
        );
        finalAvatarUrl = cloudRes.data.secure_url;
      }

      const updatePayload = {
        full_name: form.name,
        phone: form.phone,
        address: form.address,
        date_of_birth: form.dob,
        avatar_url: finalAvatarUrl,
        bio: form.bio,
        clinic_room: form.clinicRoom,
        tags: Array.isArray(form.tags) ? form.tags.join(", ") : form.tags,
      };

      const token = localStorage.getItem("token");
      const API_URL_USER = import.meta.env.VITE_API_URL_USER;

      const res = await axios.patch(
        `${API_URL_USER}/users/profile`,
        updatePayload,
        { headers: { Authorization: `Bearer ${token}` } },
      );

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
