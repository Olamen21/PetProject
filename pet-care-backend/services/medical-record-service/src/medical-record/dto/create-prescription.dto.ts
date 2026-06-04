import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePrescriptionDto {
  @ApiProperty({
    example: 'Amoxicillin',
    description: 'Tên thuốc được kê đơn',
  })
  medication_name!: string;
  @ApiProperty({
    example: '500mg',
    description: 'Liều lượng thuốc được kê đơn',
  })
  dosage!: string;
  @ApiProperty({
    example: 7,
    description: 'Thời gian sử dụng thuốc được kê đơn (tính bằng ngày)',
  })
  duration!: number;
  @ApiPropertyOptional({
    example: 'Uống sau ăn, chia làm 2 lần mỗi ngày',
    description: 'Ghi chú thêm về cách sử dụng thuốc',
  })
  note?: string;
}
