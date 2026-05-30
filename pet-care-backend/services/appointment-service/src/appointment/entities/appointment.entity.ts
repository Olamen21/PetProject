import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AppointmentStatus } from '../constants/enums';

@Entity('appointment')
export class Appointment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  pet_id!: number;

  @Column()
  user_id!: number;

  @Column()
  vet_id!: number;

  @Column({ type: 'timestamp' })
  appointment_date!: Date;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  status!: AppointmentStatus;

  @Column({ nullable: true })
  user_note!: string;

  // @Column({ nullable: true })
  // vet_note!: string;

  @CreateDateColumn()
  create_at!: Date;

  @UpdateDateColumn()
  update_at!: Date;
}
