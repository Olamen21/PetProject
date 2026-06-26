import React, { useState } from "react";
import signUpBackGround from "../../../assets/intro_bg.png";
import logo from "../../../assets/logo.png";
import { Colors } from "../../../constants/Colors";
import CommonButton from "../../../shared/components/CommonButton";
import { FcGoogle } from "react-icons/fc";
import Divider from "../components/Divider";
import CommonMessage from "../../../shared/components/CommonMessage";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { login } from "../services/AuthApi";
import type { SignUpPayload } from "../types/SignUpPayload";

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<SignUpPayload>({
    full_name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<{
    type: "error" | "success" | "warning" | "info";
    text: string;
  } | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      formData.email.trim() === "" ||
      formData.password.trim() === "" ||
      formData.full_name.trim() === ""
    ) {
      setMessage({
        type: "error",
        text: "Please fill in all required fields!",
      });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const result = await login({
        email: formData.email,
        password: formData.password,
        full_name: formData.full_name,
      });

      if (result && result.user) {
        const { user } = result;

        if (user.role === "ADMIN" || user.role === "VET") {
          setMessage({ type: "success", text: "Login successful!" });
          localStorage.setItem("user_role", user.role);

          if (user.role === "VET") {
            setTimeout(() => {
              navigate("/vet/appointments");
            }, 1000);
          } else {
            setTimeout(() => {
              navigate("/pets");
            }, 1000);
          }
        } else {
          setMessage({
            type: "error",
            text: "You do not have permission to access the management page!",
          });
          localStorage.removeItem("token");
        }
      } else {
        setMessage({
          type: "error",
          text: "Incorrect login information!",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.data?.message) {
        setMessage({ type: "error", text: error.response.data.message });
      } else {
        setMessage({ type: "error", text: "An unexpected error occurred." });
      }
    }
  };

  return (
    <div style={styles.container}>
      {/* logo */}
      <div style={styles.logo}>
        <img
          src={logo}
          alt="logo"
          style={{ width: 100, height: 100, marginBottom: 20 }}
        />
      </div>

      {/* img intro + form */}
      <div style={styles.content}>
        <div style={styles.formBox}>
          <h2 style={styles.heading}>Login</h2>
          <LoginForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
          />
          {message && (
            <CommonMessage type={message.type} message={message.text} />
          )}
          <p
            style={{
              color: Colors.gray,
              display: "flex",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            Don’t have an account?
            <span style={styles.loginLink} onClick={() => navigate("/signup")}>
              Sign up
            </span>
          </p>
          <Divider text="Or login with" />
          <CommonButton
            Icon={FcGoogle}
            backgroundColor={Colors.white}
            onClick={() => {}}
            bordered
            borderColor={Colors.secondary}
            textColor={Colors.text}
            style={{ width: "100%" }}
          />
        </div>
        <div style={styles.RightBox}>
          <img
            src={signUpBackGround}
            alt="Sign Up Background"
            style={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  logo: {
    display: "flex",
    justifyContent: "flex-start",
    padding: "10px",
    marginLeft: "90px",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "40px",
    paddingLeft: "100px",
    paddingRight: "100px",
  },
  image: {
    width: "80%",
    height: "auto",
  },
  formBox: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    width: "350px",
  },
  heading: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "#3B4953",
  },
  loginLink: {
    color: Colors.primary,
    fontWeight: "600",
    textDecoration: "none",
    marginLeft: "5px",
    cursor: "pointer",
  },
  RightBox: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default LoginPage;
