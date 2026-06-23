export interface SignUpPayload {
  email: string;
  password: string;
  full_name: string;
}
export interface SignUp {
  email: string;
  password: string;
  full_name: string;
   confirmPassword: string;
}