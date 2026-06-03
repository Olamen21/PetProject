export interface AppointmentList {
    id: number;
    petName: string;
    species?: string;
    breed?: string;
    owner?: string;
    time: string;
    date: string;
    user_note?: string;
    pet_id?: number;
    appointment_date: Date;
    status: 'CONFIRMED' | 'PENDING' | 'CANCELLED'; 
}
