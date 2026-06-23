export interface PetVaccine {
    id: number;
    pet_id: number;
    vaccine_id: number;
    pet_name: string;
    owner_name: string;
    vaccine_name: string;
    species: string;
    scheduled_date?: string;
    status?: "PENDING" | "COMPLETED" | "CANCELED";
    note?: string;
}