import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VaccinationStatus } from '../constants/enums';
import { VaccineCategory } from './vaccine-category.entity';

@Entity('pet-vaccinations')
export class PetVaccination {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  pet_id!: number;

  @Column()
  dose_number!: number;

  @Column()
  vaccine_id!: number;

  @ManyToOne(() => VaccineCategory, (item) => item.vaccinations)
  @JoinColumn({ name: 'vaccine_id' })
  vaccine!: VaccineCategory;

  @Column({ type: 'date' })
  scheduled_date!: Date;

  @Column({ type: 'date', nullable: true })
  administered_date!: Date;

  @Column({
    type: 'enum',
    enum: VaccinationStatus,
    default: VaccinationStatus.PENDING,
  })
  status!: VaccinationStatus;

  @Column({ nullable: true })
  note!: string;

  @CreateDateColumn()
  created_at!: Date;
}
