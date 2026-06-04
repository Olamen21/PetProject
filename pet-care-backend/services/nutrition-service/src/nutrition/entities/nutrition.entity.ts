import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('nutrition')
export class Nutrition {
  @PrimaryGeneratedColumn()
  food_id!: number;

  @Column()
  food_name!: string;

  @Column()
  calories!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  protein!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  fat!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  carb!: number;

  @Column()
  species!: string;
}
