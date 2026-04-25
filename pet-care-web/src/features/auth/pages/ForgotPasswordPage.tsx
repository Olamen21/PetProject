import React, { useState } from "react";
import signUpBackGround from "../../../assets/intro_bg.png";
import logo from "../../../assets/logo.png";
import { Colors } from "../../../constants/Colors";
import CommonButton from "../../../shared/components/CommonButton";
import { FcGoogle } from "react-icons/fc";
import Divider from "../components/Divider";
import CommonMessage from "../../../shared/components/CommonMessage";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import CommonTextInput from "../../../shared/components/CommonTextInput";

const ForgotPasswordPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [message, setMessage] = useState<{ type: "error" | "success" | "warning" | "info"; text: string } | null>(null);
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

    if(formData.email.trim() === "") {
      setMessage({ type: "error", text: "Vui lòng nhập email!" });
      return;
    }
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
                <div style={styles.backLink}>
                    <IoIosArrowBack 
                        size={23} 
                        color={Colors.text}
                        style={{ cursor: "pointer"}}
                        onClick={() => navigate("/login")}
                    />
                    <Link to="/login" style={styles.backTextLink}>
                        Back into login
                    </Link>
                </div>
                <h2 style={styles.heading}>Forgot Password</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <CommonTextInput type="email" name="email" placeholder="Email" value={formData.email} onChangeText={handleChange} />
                    <button type="submit" style={styles.button} disabled={loading}>
                        Submit
                    </button>
                </form>
                {message && <CommonMessage type={message.type} message={message.text} />}
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
  backLink: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "5px",
    marginBottom: "20px",
  },
  backTextLink: {
    color: Colors.text,
    fontWeight: "500",
    textDecoration: "none",
    cursor: "pointer" 
  },
  heading: {
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#3B4953',
  },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    button: {
        marginTop: "15px",
        padding: "10px",
        backgroundColor: Colors.primary,
        color: Colors.white,
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
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

export default ForgotPasswordPage;