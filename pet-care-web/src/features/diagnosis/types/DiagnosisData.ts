export interface MedicationItem {
  medication_name: string;
  dosage: string;
  duration: number | "";
}

export interface DiagnosisData {
  symptoms: string;
  diagnosis: string;
  vet_notes: string;
  weight_at_exam: number | "";
  medications: MedicationItem[];
  appointment_id: number;
  title: string;
}
