export interface User {
    id?: number;
    full_name: string;
    email: string;
    phone_number: string;
    role: "ADMIN" | "STAFF" | "VET";
    avatar_url: string;
}