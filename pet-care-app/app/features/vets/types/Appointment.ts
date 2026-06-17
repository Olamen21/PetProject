export interface Appointment {
  id: number;
  user_id: number;
  vet_id: number;
  pet_id: number;
  user_note: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  created_at: string;
  updated_at: string;
  pet_name: string;
  vet_name: string;
  date: string;
  time: string;
  vet_image: string;
  appointment_date: string;
  is_reviewed: boolean;
}