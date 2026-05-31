export interface Appointment {
    id?: number;
    pet_id: number;
    vet_id: number;
    user_id: number;
    appointment_date: string; 
    user_note: string;
    vet_note: string;
    status: 'scheduled' | 'completed' | 'canceled';
}