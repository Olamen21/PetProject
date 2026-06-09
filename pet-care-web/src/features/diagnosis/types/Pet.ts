export interface Pet {
  id: number;
  owner_id?: number;
  name?: string;
  species?: string;
  gender?: string;
  breed_id?: number;
  height?: number;
  weight?: number;
  dob?: string;
  neutered?: string;
  allergies?: string[];
  avatar_url?: string;
  pet_name: string;
  owner_name: string;
  user_note?: string;
}
