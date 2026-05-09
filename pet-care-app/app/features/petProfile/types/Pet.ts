export interface Pet {
  id: number;              
  name: string;           
  breed: string;           
  date_of_birth: string;        
  gender: "Male" | "Female"; 
  avatar_url?: string;      
  species: string,
  height?: number,
  weight: number,
  neutered?: boolean,
  allergies?: string,
}
