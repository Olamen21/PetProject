import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('doctor_profiles')
export class DoctorProfile {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  tags?: string;

  @Column({ nullable: true })
  degree?: string;

  @Column({ nullable: true })
  clinic_room?: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;
  @Column({ type: 'date', nullable: true })
  experience_start_date!: Date;

  @Column({ nullable: true })
  certificate_url?: string;

  @OneToOne(() => User, (user) => user.doctorProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user?: User;
}
