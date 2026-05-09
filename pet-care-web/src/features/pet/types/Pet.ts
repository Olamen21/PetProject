export interface Pet {
  id?: string;
  owner_id?: number;
  name: string;
  species: string;
  gender: string;
  breed_id: number;
  height: number;
  weight: number;
  dob: string;
  neutered: string;
  allergies: string[];
  avatar_url: string;
}
