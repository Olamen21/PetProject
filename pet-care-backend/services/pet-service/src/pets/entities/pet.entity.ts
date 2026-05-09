import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('pets')
export class Pet {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  species!: string;

  @Column({ nullable: true })
  breed!: string;

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
  image!: string;

  @Column({ nullable: true })
  neutered!: boolean;

  @Column({ nullable: true })
  allergies!: string;

  @Column({ nullable: true })
  height!: number;
}
