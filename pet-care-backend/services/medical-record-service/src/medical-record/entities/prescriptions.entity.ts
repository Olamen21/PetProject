import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { MedicalExamination } from './medical_examinations.entity';

@Entity('prescriptions')
export class Prescription {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  pet_id!: number;

  @Column()
  medication_name!: string;

  @Column()
  dosage!: string;

  @Column()
  duration!: number;

  @Column({ nullable: true })
  note!: string;

  @ManyToOne(() => MedicalExamination, (exam) => exam.prescriptions)
  @JoinColumn({ name: 'examination_id' })
  examination!: MedicalExamination;
}
