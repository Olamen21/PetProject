interface DoctorProfile {
  id: number;
  tags?: string | null;
  degree?: string | null;
  clinic_room?: string | null;
  bio?: string | null;
  experience_start_date?: string | null;
  certificate_url?: string | null;
}
export interface Vets {
    id?: number;
    full_name: string;
    role: string;
    avatar_url: string;
    rating?: number;
    bio?: string;
    doctorProfile?: DoctorProfile;
}