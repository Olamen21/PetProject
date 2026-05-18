import { ApiProperty } from '@nestjs/swagger';

export class VaccineCategoryDto {
  @ApiProperty({
    example: 'Vaccine 7 bệnh',
    description: 'Tên loại vaccine',
  })
  name!: string;

  @ApiProperty({
    example: 'Dog',
    description: 'Loài thú cưng (Dog/Cat)',
  })
  target_species!: string;

  @ApiProperty({
    example: 100,
    description: 'Số lượng vaccine có sẵn',
  })
  quantity!: number;

  @ApiProperty({
    example: 3,
    description: 'Số mũi tiêm tối đa cho loại vaccine này',
  })
  max_doses!: number;
}
