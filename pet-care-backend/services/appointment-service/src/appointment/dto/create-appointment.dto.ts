import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({
    example: 1,
    description: 'ID của pet',
  })
  pet_id!: number;

  @ApiProperty({
    example: 1,
    description: 'ID của vet',
  })
  vet_id!: number;

  @ApiProperty({
    example: '2024-07-01T14:30:00',
    description: 'Ngày và giờ hẹn (định dạng ISO 8601: YYYY-MM-DDTHH:mm:ss)',
  })
  appointment_date!: Date;
  @ApiProperty({
    example: 'Cần kiểm tra sức khỏe định kỳ',
    description: 'Ghi chú của người dùng về cuộc hẹn',
  })
  user_note!: string;
}
