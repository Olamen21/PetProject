import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
} from 'typeorm';
@Entity('Review')
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  appointment_id!: number;

  @Column()
  vet_id!: number;

  @Column()
  user_id!: number;

  @Column()
  rating!: number;

  @Column()
  comment!: string;

  @CreateDateColumn()
  created_at!: Date;
}
