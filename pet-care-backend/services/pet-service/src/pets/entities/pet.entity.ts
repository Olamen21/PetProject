import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Breed } from './breed.entity';

@Entity('pets')
export class Pet {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  species!: string;

  @ManyToOne(() => Breed, (breed) => breed.pets)
  @JoinColumn({ name: 'breed_id' })
  breed_relation!: Breed;

  @Column()
  breed_id!: number;

  @Column()
  gender!: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth!: Date;

  @Column({ nullable: true })
  weight!: number;

  @Column()
  owner_id!: number;

  @Column({ nullable: true })
  avatar_url!: string;

  @CreateDateColumn()
  created_at!: Date;

  @Column({ nullable: true })
  neutered!: boolean;

  @Column({ nullable: true })
  allergies!: string;

  @Column({ nullable: true })
  height!: number;
}
