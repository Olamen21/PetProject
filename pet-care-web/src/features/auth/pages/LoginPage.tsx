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
import LoginForm from "../components/LoginForm";

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState<{ type: "error" | "success" | "warning" | "info"; text: string } | null>(null);
  const navigate = useNavigate();

  // Kiểm tra email hợp lệ
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateUsername = (username: string) => {
    return username.trim() !== "";
  };
  
  // Kiểm tra password
  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateUsername(formData.userName)) {
      setMessage({ type: "error", text: "Username không được để trống!" });
      return;
    }

    if (!validateEmail(formData.email)) {
      setMessage({ type: "error", text: "Email không hợp lệ!" });
      return;
    }

    if (!validatePassword(formData.password)) {
      setMessage({ type: "error", text: "Password phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt!" });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Mật khẩu xác nhận không khớp!" });
      return;
    }

    setMessage({ type: "success", text: "Đăng ký thành công!" });
    console.log("Form submitted:", formData);
  };


  return (
    <div style={styles.container}>

        {/* logo */}
        <div style={styles.logo}>
            <img 
                src= {logo}
                alt="logo"
                style={{width: 100, height: 100, marginBottom: 20}}
            />
        </div>

        {/* img intro + form */}
        <div style={styles.content}>
            <div style={styles.formBox}>
                <h2 style={styles.heading}>Login</h2>
                <LoginForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
                {message && <CommonMessage type={message.type} message={message.text} />}
                <p style={{ color: Colors.gray, display: "flex", justifyContent: "center", marginTop: 10 }}>
                   Don’t have an account?
                   <span 
                      style={styles.loginLink} 
                      onClick={() => navigate("/signup")}
                    >
                      Sign up
                    </span>
                </p>
                <Divider text="Or login with" />
                <CommonButton
                  Icon={FcGoogle}
                  backgroundColor= {Colors.white}
                  onClick={() => {}}
                  bordered
                  borderColor={Colors.secondary}
                  textColor={Colors.text}
                  style={{width: "100%"}}
                />
            </div>
            <div style={styles.RightBox}>
                <img 
                    src= {signUpBackGround}
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
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#3B4953',
  },
  loginLink: {
    color: Colors.primary,
    fontWeight: "600",
    textDecoration: "none",
    marginLeft: "5px",
    cursor: "pointer" 
  },
   RightBox: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

};

export default LoginPage;