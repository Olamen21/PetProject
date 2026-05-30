import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('prescriptions')
export class Prescription {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  pet_id!: number;

  @Column()
  medication_name!: string;

  @Column()
  dosage!: string;

  @Column()
  duration!: number;

  @Column({ nullable: true })
  note!: string;
}
