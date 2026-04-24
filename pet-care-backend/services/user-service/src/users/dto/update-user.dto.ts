import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({ example: 'Huỳnh Thanh Thúy', description: 'Họ và tên' })
  full_name?: string;

  @ApiProperty({ example: '0901234567', description: 'Số điện thoại' })
  phone?: string;

  @ApiProperty({ example: 'https://image.com/avatar.png', required: false })
  avatar_url?: string;
}
