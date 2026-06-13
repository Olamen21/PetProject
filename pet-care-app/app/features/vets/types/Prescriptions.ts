export interface MedicationItem {
  id?: number;              
  pet_id?: number;          
  medication_name: string;  
  dosage: string;          
  duration: number;        
  note?: string | null;    
}

export interface PrescriptionDisplayItem extends MedicationItem {
  id: number;              
  start_date: string;       
  end_date: string;        
  status: 'Active' | 'Expired';
}

export interface MedicalRecord {
  id: number;
  pet_id: number;
  vet_id: number;
  appointment_id?: number | null;
  symptoms: string;
  diagnosis: string;
  weight_at_exam: number | null; 
  vet_notes?: string | null;
  created_at: string;            
  prescriptions: MedicationItem[];
}