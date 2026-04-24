import { Colors } from "../../../constants/Colors";
import CommonTextInput from "../../../shared/components/CommonTextInput";

const LoginForm: React.FC<{
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}> = ({ formData, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit} style={styles.form}>
    <CommonTextInput type="email" name="email" placeholder="Email" value={formData.email} onChangeText={handleChange} />
    <CommonTextInput type="password" name="password" placeholder="Password" value={formData.password} onChangeText={handleChange} />
    
    <div style={styles.optionsRow}>
        <label style={styles.rememberMe}>
            <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe || false}
                onChange={handleChange}
            />
            Remember me
        </label>
        <a href="/forgot-password" style={styles.forgotLink}>
            Forgot Password?
        </a>
    </div>
    
    <button type="submit" style={styles.button}>
        Login
    </button>
  </form>
);

const styles: { [key: string]: React.CSSProperties } = {
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    optionsRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "5px",
    },
    rememberMe: {
        fontSize: "14px",
        color: Colors.text,
        display: "flex",
        alignItems: "center",
        gap: "5px",
    },
    forgotLink: {
        fontSize: "14px",
        color: Colors.primary,
        cursor: "pointer",
        textDecoration: "none",
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
};

export default LoginForm;

