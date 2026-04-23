import React, { useState } from "react";
import signUpBackGround from "../../../assets/intro_bg.png";
import logo from "../../../assets/logo.png";
import { theme } from "../../../styles/theme";
import CommonTextInput from "../../../shared/components/CommonTextInput";
import CommonButton from "../../../shared/components/CommonButton";
import { FcGoogle } from "react-icons/fc";

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
                <h2 style={theme.typography.heading}>Sign up</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                <CommonTextInput 
                    name="userName"
                    placeholder="User Name"
                    value={formData.userName}
                    onChangeText={(e) => handleChange(e)}
                />
                <CommonTextInput 
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChangeText={(e) => handleChange(e)}
                />
                <CommonTextInput 
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChangeText={(e) => handleChange(e)}
                />
                <CommonTextInput 
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChangeText={(e) => handleChange(e)}
                />
                <button type="submit" style={styles.button}>
                    Create account
                </button>
                </form>
                <p style={{ color: theme.colors.gray, display: "flex", justifyContent: "center", marginTop: 10 }}>
                  Already have an account? <a style={styles.loginLink} href="/login">Login</a>
                </p>
                <div style={{ display: "flex", alignItems: "center", margin: "20px 0" }}>
                  <div style={{ flex: 1, height: 1, backgroundColor: theme.colors.gray }} />
                  <span style={{ margin: "0 10px", color: theme.colors.gray, fontSize: 14 }}>
                    Or Sign up with
                  </span>
                  <div style={{ flex: 1, height: 1, backgroundColor: theme.colors.gray }} />
                </div>

                <CommonButton
                  Icon={FcGoogle}
                  backgroundColor= {theme.colors.white}
                  onClick={() => {}}
                  bordered
                  borderColor={theme.colors.secondary}
                  textColor={theme.colors.text}
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
    backgroundColor: theme.colors.white,
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    width: "350px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  button: {
    marginTop: "15px",
    padding: "10px",
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  loginLink: {
    color: theme.colors.primary,
    fontWeight: "600",
    textDecoration: "none",
    marginLeft: "5px",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    margin: "20px 0",
    flex: 1,
    borderBottom: "1px solid #ccc",
  },
  dividerText: {
    flex: 1,
    padding: "0 10px",
    color: "#666",
    fontSize: "14px",
    position: "relative",
  },
  social: {
    marginTop: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  socialBtn: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fafafa",
    cursor: "pointer",
  },
};

export default SignUpPage;
