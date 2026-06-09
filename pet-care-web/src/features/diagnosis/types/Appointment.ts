export interface Appointment {
    id: number;
    pet_id: number;
    pet_name: string;
    owner_name: string;
    vet_id: number;
    user_id: number;
    appointment_date: string; 
    user_note: string;
    vet_note: string;
    status: 'CONFIRMED' | 'PENDING' | 'CANCELLED'; 
    note?: string;
}