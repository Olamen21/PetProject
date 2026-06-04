import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreatePrescriptionDto } from '../dto/create-prescription.dto';

export class CreateMedicalRecordDto {
  @ApiProperty({
    example: 1,
    description: 'ID của thú cưng',
  })
  pet_id!: number;

//   @ApiProperty({
//     example: 1,
//     description: 'ID của bác sĩ thú y',
//   })
//   vet_id!: number;
  @ApiPropertyOptional({
    example: 1,
    description: 'ID của cuộc hẹn (nếu có)',
  })
  appointment_id?: number;
  @ApiProperty({
    example: 'Chó bị tiêu chảy và nôn mửa',
    description: 'Triệu chứng của thú cưng tại thời điểm khám',
  })
  symptoms!: string;
  @ApiProperty({
    example: 'Chẩn đoán ban đầu là viêm dạ dày, cần theo dõi thêm',
    description: 'Chẩn đoán của bác sĩ thú y',
  })
  diagnosis!: string;
  @ApiPropertyOptional({
    example: 5.5,
    description: 'Cân nặng của thú cưng tại thời điểm khám (kg)',
  })
  weight_at_exam?: number;
  @ApiPropertyOptional({
    example:
      'Bác sĩ lưu ý theo dõi tình trạng tiêu chảy và nôn mửa, nếu không cải thiện sau 3 ngày cần đưa đi khám lại.',
    description: 'Ghi chú của bác sĩ thú y',
  })
  vet_notes?: string;
  @ApiProperty({
    type: [CreatePrescriptionDto],
    description: 'Danh sách thuốc được kê đơn cho thú cưng',
  })
  medications!: CreatePrescriptionDto[];
}
