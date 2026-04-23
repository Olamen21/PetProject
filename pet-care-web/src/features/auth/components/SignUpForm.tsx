import { Colors } from "../../../constants/Colors";
import CommonTextInput from "../../../shared/components/CommonTextInput";

const SignUpForm: React.FC<{
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}> = ({ formData, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit} style={styles.form}>
    <CommonTextInput name="userName" placeholder="User Name" value={formData.userName} onChangeText={handleChange} />
    <CommonTextInput type="email" name="email" placeholder="Email" value={formData.email} onChangeText={handleChange} />
    <CommonTextInput type="password" name="password" placeholder="Password" value={formData.password} onChangeText={handleChange} />
    <CommonTextInput type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChangeText={handleChange} />
   <button type="submit" style={styles.button}>
        Create account
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

