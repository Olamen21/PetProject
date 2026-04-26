import React, { useState } from "react";
import Sidebar from "../../../shared/components/Sidebar";
import { Colors } from "../../../constants/Colors";
import CommonTextInput from "../../../shared/components/CommonTextInput";
import CommonButton from "../../../shared/components/CommonButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLock, FaArrowLeft } from "react-icons/fa";
import CommonMessage from "../../../shared/components/CommonMessage";

function ChangePasswordPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState<{
    type: "error" | "success" | "warning" | "info";
    text: string;
  } | null>(null);

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleChangePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = form;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage({ type: "error", text: "Please fill in all the fields." });
      return;
    }

    if (currentPassword === newPassword) {
      setMessage({
        type: "error",
        text: "The new password must not be the same as the old password.",
      });
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      setMessage({
        type: "error",
        text: "The new password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.",
      });

      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({
        type: "error",
        text: "The new password and the confirmation password do not match.",
      });

      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const API_URL_USER = import.meta.env.VITE_API_URL_USER;

      const res = await axios.patch(
        `${API_URL_USER}/users/change-password`,
        {
          oldPassword: currentPassword,
          newPassword: newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (res.status === 200 || res.status === 201) {
        alert("Password changed successfully.");
        navigate("/profile");
      }
    } catch (error: any) {
      console.error("Lỗi đổi mật khẩu:", error);
      alert(error.response?.data?.message || "Password change failed.");
    } finally {
      setLoading(false);
    }
    if (message) setMessage(null);
  };

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: "flex",
      paddingLeft: 300,
      background: Colors.background,
      minHeight: "100vh",
    },
    main: {
      flex: 1,
      padding: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    card: {
      background: Colors.white,
      borderRadius: "20px",
      padding: "32px",
      width: "100%",
      maxWidth: "500px",
      boxShadow: "0 10px 25px " + Colors.border,
    },
    header: {
      marginBottom: "24px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    title: {
      fontSize: "22px",
      fontWeight: "700",
      color: Colors.text,
      margin: 0,
    },
    subtitle: {
      fontSize: "14px",
      color: "#666",
      marginBottom: "24px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    footer: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      marginTop: "32px",
    },
  };

  return (
    <div style={styles.container}>
      <Sidebar />

      <main style={styles.main}>
        <div style={styles.card}>
          <div style={styles.header}>
            <FaLock color={Colors.primary} size={24} />
            <h2 style={styles.title}>Change Password</h2>
          </div>

          <p style={styles.subtitle}>
            The new password must be at least 8 characters long and include
            uppercase letters, lowercase letters, numbers, and special
            characters.
          </p>

          <div style={styles.formGroup}>
            <CommonTextInput
              label="Current Password"
              placeholder="Enter current password"
              secureTextEntry
              value={form.currentPassword}
              onChangeText={(e) =>
                handleChange("currentPassword", e.target.value)
              }
            />

            <CommonTextInput
              label="New Password"
              placeholder="Enter new password"
              secureTextEntry
              value={form.newPassword}
              onChangeText={(e) => handleChange("newPassword", e.target.value)}
            />

            <CommonTextInput
              label="Confirm New Password"
              placeholder="Confirm New Password"
              secureTextEntry
              value={form.confirmPassword}
              onChangeText={(e) =>
                handleChange("confirmPassword", e.target.value)
              }
            />
            {message && (
              <CommonMessage type={message.type} message={message.text} />
            )}
          </div>

          <div style={styles.footer}>
            <CommonButton
              title={loading ? "Processing..." : "Update Password"}
              onClick={handleChangePassword}
              backgroundColor={Colors.primary}
              textColor={Colors.white}
            />

            <CommonButton
              title="Back to Profile"
              onClick={() => navigate("/profile")}
              backgroundColor={Colors.white}
              textColor={Colors.text}
              Icon={FaArrowLeft}
              iconSize={14}
              bordered
              borderColor={Colors.border}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default ChangePasswordPage;
