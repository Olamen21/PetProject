export interface Vaccine {
    id?: string;
    name: string;
    quantity: number;
    target_species: string;
    max_doses?: number;
}