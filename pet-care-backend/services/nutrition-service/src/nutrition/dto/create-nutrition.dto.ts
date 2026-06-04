import { ApiProperty } from '@nestjs/swagger';

export class CreateNutritionDto {
  @ApiProperty({
    example: 'beef',
    description: 'Tên thực phẩm',
  })
  food_name!: string;

  @ApiProperty({
    example: 169,
    description: 'Lượng calo (kcal)',
  })
  calories!: number;

  @ApiProperty({
    example: 27.6,
    description: 'Hàm lượng protein (g)',
  })
  protein!: number;

  @ApiProperty({
    example: 6.5,
    description: 'Hàm lượng chất béo (g)',
  })
  fat!: number;

  @ApiProperty({
    example: 0,
    description: 'Hàm lượng carbohydrate (g)',
  })
  carb!: number;

  @ApiProperty({
    example: 'Dog',
    description: 'Loài thú cưng (Dog/Cat)',
  })
  species!: string;
}
