import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm';
import { PetVaccination } from './vaccine.entity';

@Entity('vaccine-categories')
export class VaccineCategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  target_species!: string;

  @Column({ type: 'int', default: 0 })
  quantity!: number;

  @Column({ type: 'int', default: 1 })
  max_doses!: number;

  @OneToMany(() => PetVaccination, (v) => v.vaccine)
  vaccinations!: PetVaccination[];
}
