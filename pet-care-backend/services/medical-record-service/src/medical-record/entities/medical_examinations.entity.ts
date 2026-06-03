import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column()
  diagnosis!: string;

  @Column({ nullable: true })
  weight_at_exam!: number;

  @Column({ nullable: true })
  symptoms!: string;

  @Column({ nullable: true })
  vet_notes!: string;

  @CreateDateColumn()
  created_at!: Date;
}
