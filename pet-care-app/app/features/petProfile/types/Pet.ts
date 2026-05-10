export interface Pet {
  id: number;              
  name: string;           
  breed_id: number;      
  date_of_birth: string;        
  gender: "Male" | "Female"; 
  avatar_url?: string;      
  species: string,
  height?: number,
  weight: number,
  neutered?: boolean,
  allergies?: string;
}
