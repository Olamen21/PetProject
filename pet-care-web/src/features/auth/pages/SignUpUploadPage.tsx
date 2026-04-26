import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaIdCard,
  FaHospital,
} from "react-icons/fa";
import { Colors } from "../../../constants/Colors";
import UploadHeader from "../components/SignUpUploadPage/UploadHeader";
import UploadArea from "../components/SignUpUploadPage/UploadArea";
import InputField from "../components/SignUpUploadPage/InputField";
import { useAuth } from "../../../context/AuthContext";

const SignUpUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const userFromAuth = useAuth();

  useEffect(() => {
    if (userFromAuth?.role === "PENDING_VET") {
      alert(
        "The doctor’s profile has been submitted! Please wait for the Admin’s approval.",
      );
      navigate("/login");
    }
    if (userFromAuth?.role === "VET") {
      navigate("/vet-dashboard");
    }
  }, [userFromAuth]);

  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    date_of_birth: "",
    degree: "",
    clinic_room: "",
    experience_start_date: "",
    certificate_image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, certificate_image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    const API_URL_USER = import.meta.env.VITE_API_URL_USER;
    if (formData.date_of_birth) {
      const selectedYear = new Date(formData.date_of_birth).getFullYear();
      const currentYear = new Date().getFullYear();

      if (selectedYear <= 1900 || selectedYear >= currentYear) {
        alert(
          `Năm sinh phải lớn hơn 1900 và nhỏ hơn năm hiện tại (${currentYear})`,
        );
        return;
      }
    } else {
      alert("Không được để trống ngày sinh");
      return;
    }

    if (formData.experience_start_date) {
      const birthYear = new Date(formData.date_of_birth).getFullYear();
      const expStartYear = new Date(formData.experience_start_date).getFullYear(); 
      const currentYear = new Date().getFullYear(); 

      if (expStartYear >= currentYear) {
        alert(
          `Năm bắt đầu làm việc phải nhỏ hơn năm hiện tại (${currentYear})!`,
        );
        return;
      }

      if (expStartYear <= birthYear) {
        alert("Năm bắt đầu làm việc phải lớn hơn năm sinh!");
        return;
      }

      if (expStartYear - birthYear < 18) {
        console.warn("Năm không hợp lệ");
      }
    } else {
      alert("Không để trống ngày bắt đầu làm việc!");
      return;
    }
    const data = new FormData();
    data.append("phone", formData.phone);
    data.append("address", formData.address);
    data.append("date_of_birth", formData.date_of_birth);
    data.append("degree", formData.degree);
    data.append("clinic_room", formData.clinic_room);
    data.append("experience_start_date", formData.experience_start_date);
    if (formData.certificate_image) {
      data.append("file", formData.certificate_image);
    }

    try {
      await axios.post(`${API_URL_USER}/users/apply-vet`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert(
        "The doctor’s profile has been submitted! Please wait for the Admin’s approval.",
      );
      navigate("/login");
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "An error occurred while submitting the profile.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <UploadHeader />
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <InputField
              label="Phone Number"
              icon={<FaPhone />}
              type="text"
              name="phone"
              placeholder="090..."
              onChange={handleChange}
              required
            />
            <InputField
              label="Date of Birth"
              icon={<FaCalendarAlt />}
              type="date"
              name="date_of_birth"
              onChange={handleChange}
              required
            />
          </div>

          <InputField
            label="Clinic Address"
            icon={<FaMapMarkerAlt />}
            type="text"
            name="address"
            placeholder="House number, street name..."
            onChange={handleChange}
            required
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <InputField
              label="Degree"
              icon={<FaIdCard />}
              type="text"
              name="degree"
              placeholder="Master's, Doctorate..."
              onChange={handleChange}
              required
            />
            <InputField
              label="Clinic Room Name"
              icon={<FaHospital />}
              type="text"
              name="clinic_room"
              placeholder="Room number..."
              onChange={handleChange}
              required
            />
          </div>

          <InputField
            label="Experience Start Date"
            icon={<FaCalendarAlt />}
            type="date"
            name="experience_start_date"
            onChange={handleChange}
            required
          />

          <label
            style={{ fontWeight: "bold", marginBottom: "8px", color: "#555" }}
          >
            Certificate Image (Professional License)
          </label>
          <UploadArea
            imagePreview={imagePreview}
            handleFileChange={handleFileChange}
          />

          <button style={styles.submitBtn} type="submit" disabled={loading}>
            {loading ? "Submitting profile..." : "Submit Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: Colors.background,
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "600px",
  },
  submitBtn: {
    width: "100%",
    padding: "15px",
    backgroundColor: Colors.primary,
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
    transition: "0.3s",
  },
};

export default SignUpUploadPage;
