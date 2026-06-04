import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBreedDto {
  @ApiProperty({
    example: 'Golden Retriever',
    description: 'Tên của giống thú cưng',
  })
  name!: string;

  @ApiPropertyOptional({
    example: 'Dog',
    description: 'Loài của giống thú cưng',
  })
  species?: string;

  @ApiPropertyOptional({
    example: 'Giống chó thông minh, trung thành và dễ huấn luyện.',
    description: 'Mô tả chi tiết về đặc điểm của giống này',
  })
  description?: string;
}
