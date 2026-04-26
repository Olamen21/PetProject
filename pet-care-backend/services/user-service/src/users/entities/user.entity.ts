import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
  OneToOne,
} from 'typeorm';
import { Role } from '../../roles/role.enum';
import * as bcrypt from 'bcrypt';
import { DoctorProfile } from './doctor-profile.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password_hash!: string;

  @Column({ nullable: true })
  full_name!: string;

  @Column({ nullable: true })
  phone!: string;

  @Column({ nullable: true })
  address!: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth!: Date | null;
  @Column({ nullable: true })
  avatar_url!: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role!: Role;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updated_at!: Date;
  @OneToOne(() => DoctorProfile, (profile) => profile.user, { cascade: true })
  doctorProfile: DoctorProfile;
}
