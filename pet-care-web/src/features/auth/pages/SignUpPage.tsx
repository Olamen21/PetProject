import React, { useState } from "react";
import signUpBackGround from "../../../assets/intro_bg.png";
import logo from "../../../assets/logo.png";
import { Colors } from "../../../constants/Colors";
import CommonButton from "../../../shared/components/CommonButton";
import { FcGoogle } from "react-icons/fc";
import SignUpForm from "../components/SignUpForm";
import Divider from "../components/Divider";

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }
    console.log("Form submitted:", formData);
    // Gửi dữ liệu lên server tại đây
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
            <div style={styles.leftBox}>
                <img 
                    src= {signUpBackGround}
                    alt="Sign Up Background"
                    style={styles.image}
                />
            </div>
            <div style={styles.formBox}>
                <h2 style={styles.heading}>Sign up</h2>
                <SignUpForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
                <p style={{ color: Colors.gray, display: "flex", justifyContent: "center", marginTop: 10 }}>
                  Already have an account? <a style={styles.loginLink} href="/login">Login</a>
                </p>
                <Divider text="Or Sign up with" />
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
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#3B4953',
  },
  loginLink: {
    color: Colors.primary,
    fontWeight: "600",
    textDecoration: "none",
    marginLeft: "5px",
  },

};

export default SignUpPage;