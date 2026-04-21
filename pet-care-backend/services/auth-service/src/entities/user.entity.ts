import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

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

  @Column({ default: 'user' })
  role!: string; //enum

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updated_at!: Date;

  @Column({ default: true })
  isActive!: boolean;
}
