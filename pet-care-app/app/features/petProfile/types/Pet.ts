export interface Pet {
  id: number;              
  name: string;           
  breed: string;           
  birthday: string;        
  gender: "Male" | "Female"; 
  photo?: string;      
  reproStatus?: string;
}
