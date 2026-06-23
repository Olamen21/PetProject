export interface DoctorProfile {
  id: number;
  tags?: string | null;
  degree?: string | null;
  clinic_room?: string | null;
  bio?: string | null;
  experience_start_date?: string | null;
  certificate_url?: string | null;
  years_of_experience?: string | null;
}
export interface User {
  id: number;
  full_name: string;
  role: "ADMIN" | "VET" | "PENDING_VET" | string;
  avatar_url: string;
  rating?: number;
  bio?: string;
  doctorProfile?: DoctorProfile;
  email: string;
  date_of_birth: string;
  phone: string;
  address: string;
}