import { Colors } from "../../../constants/Colors";
import CommonTextInput from "../../../shared/components/CommonTextInput";
import type { SignUp } from "../types/SignUpPayload";

const SignUpForm: React.FC<{
  formData: SignUp;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}> = ({ formData, handleChange, handleSubmit, loading }) => (
  <form onSubmit={handleSubmit} style={styles.form}>
    <CommonTextInput name="full_name" placeholder="User Name" value={formData.full_name} onChangeText={handleChange} />
    <CommonTextInput type="email" name="email" placeholder="Email" value={formData.email} onChangeText={handleChange} />
    <CommonTextInput type="password" name="password" placeholder="Password" value={formData.password} onChangeText={handleChange} />
    <CommonTextInput type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChangeText={handleChange} />
   <button type="submit" style={styles.button} disabled={loading}>
        {loading ? "Creating account..." : "Create account"}
    </button>
  </form>
);

const styles: { [key: string]: React.CSSProperties } = {
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
};

export default SignUpForm;

