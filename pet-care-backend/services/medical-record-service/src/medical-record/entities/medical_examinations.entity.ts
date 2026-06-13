import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Prescription } from './prescriptions.entity';

@Entity('medical_examinations')
export class MedicalExamination {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  pet_id!: number;

  @Column()
  vet_id!: number;

  @Column({ nullable: true })
  appointment_id!: number;

  @OneToMany(() => Prescription, (prescription) => prescription.examination, {
    cascade: true,
  })
  prescriptions!: Prescription[];

  @Column()
  diagnosis!: string;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  weight_at_exam!: number;

  @Column({ nullable: true })
  symptoms!: string;

  @Column({ nullable: true })
  vet_notes!: string;

  @CreateDateColumn()
  created_at!: Date;
}
