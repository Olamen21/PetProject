import React, { useState } from "react";
import signUpBackGround from "../../../assets/intro_bg.png";
import logo from "../../../assets/logo.png";
import { Colors } from "../../../constants/Colors";
import CommonButton from "../../../shared/components/CommonButton";
import { FcGoogle } from "react-icons/fc";
import SignUpForm from "../components/SignUpForm";
import Divider from "../components/Divider";
import CommonMessage from "../../../shared/components/CommonMessage";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/AuthApi";

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState<{
    type: "error" | "success" | "warning" | "info";
    text: string;
  } | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateUsername = (username: string) => {
    return username.trim() !== "";
  };

  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateUsername(formData.userName)) {
      setMessage({ type: "error", text: "Username cannot be empty!" });
      return;
    }
    if (!validateEmail(formData.email)) {
      setMessage({ type: "error", text: "Invalid email address!" });
      return;
    }
    if (!validatePassword(formData.password)) {
      setMessage({
        type: "error",
        text: "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters!",
      });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match!" });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const result = await signUp({
        email: formData.email,
        password: formData.password,
        full_name: formData.userName,
      });

      if (result) {
        setMessage({ type: "success", text: "Sign up successful!" });
        setTimeout(() => {
          navigate("/signup-upload");
        }, 1000);
      }
    } catch (err: any) {
      console.error("SignUp error:", err);

      const errorMsg =
        err.response?.data?.message || "Sign up failed, please try again!";
      setMessage({
        type: "error",
        text: errorMsg,
      });
    } finally {
      setLoading(false);
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
        <div style={styles.leftBox}>
          <img
            src={signUpBackGround}
            alt="Sign Up Background"
            style={styles.image}
          />
        </div>
        <div style={styles.formBox}>
          <h2 style={styles.heading}>Sign up</h2>
          <SignUpForm
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
            Already have an account?
            <span style={styles.loginLink} onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
          <Divider text="Or Sign up with" />
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
    justifyContent: "flex-end",
    padding: "10px",
    marginRight: "100px",
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
  leftBox: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
};

export default SignUpPage;
