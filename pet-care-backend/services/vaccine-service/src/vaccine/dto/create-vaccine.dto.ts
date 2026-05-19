// create-vaccine.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { DoseType } from '../constants/enums';

export class CreateVaccineDto {
  @ApiProperty({
    example: 1,
    description: 'ID của thú cưng',
  })
  pet_id!: number;

  @ApiProperty({
    example: 1,
    description: 'ID loại vaccine từ bảng VaccineCategory',
  })
  vaccine_id!: number;

  @ApiProperty({
    example: 1,
    description: 'Mũi tiêm số mấy',
  })
  dose_number!: number;

  @ApiProperty({
    example: '2024-06-15',
    description: 'Ngày hẹn tiêm (Định dạng YYYY-MM-DD)',
  })
  scheduled_date!: Date;

  @ApiProperty({
    example: 'Tiêm mũi 1 tại trạm thú y quận 1',
    description: 'Ghi chú thêm',
    required: false,
  })
  note?: string;

  @ApiProperty({
    example: 'PRIMARY',
    description: 'Loại mũi tiêm (PRIMARY hoặc BOOSTER)',
    enum: ['PRIMARY', 'BOOSTER'],
  })
  dose_type!: DoseType;
}
