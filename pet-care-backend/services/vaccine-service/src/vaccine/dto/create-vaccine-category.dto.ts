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
}
