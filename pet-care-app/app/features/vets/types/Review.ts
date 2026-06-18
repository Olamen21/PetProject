export interface Review {
    id?: number;
    vet_id?: number;
    appointment_id?: number;
    rating: number;
    comment: string;
    created_at: string;
    user_name: string;
    avatar_url: string | null;
    user_id?: number;
}