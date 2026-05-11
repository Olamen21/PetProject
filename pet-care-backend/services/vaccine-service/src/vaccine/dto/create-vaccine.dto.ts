// create-vaccine.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateVaccineDto {
  @ApiProperty({
    example: 1,
    description: 'ID của bé thú cưng',
  })
  pet_id!: number;

  @ApiProperty({
    example: 1,
    description: 'ID loại vaccine từ bảng VaccineCategory',
  })
  vaccine_id!: number;

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
}
