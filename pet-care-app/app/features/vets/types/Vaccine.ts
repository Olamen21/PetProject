export interface Vaccine {
    id?:number;
    petId?: number;
    category_id?: number;
    note?: string;
    scheduled_date?: Date;
    dose_number?: number;
}