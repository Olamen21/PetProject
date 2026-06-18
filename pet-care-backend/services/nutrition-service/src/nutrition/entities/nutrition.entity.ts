import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('nutrition')
export class Nutrition {
  @PrimaryGeneratedColumn()
  food_id!: number;

  @Column()
  food_name!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  calories!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  protein!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  fat!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  carb!: number;

  @Column()
  species!: string;
}
