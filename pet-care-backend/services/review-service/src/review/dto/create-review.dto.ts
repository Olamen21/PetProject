import { ApiProperty } from '@nestjs/swagger';
export class CreateReviewDto {
  @ApiProperty({
    example: 1,
    description: 'ID của lịch hẹn',
  })
  appointment_id!: number;

  @ApiProperty({
    example: 2,
    description: 'ID của bác sĩ thú y',
  })
  vet_id!: number;

  @ApiProperty({
    example: 5,
    description: 'Điểm đánh giá (1-5)',
  })
  rating!: number;

  @ApiProperty({
    example: 'Bác sĩ rất tận tâm và chu đáo',
    description: 'Nội dung bình luận',
  })
  comment!: string;
}
