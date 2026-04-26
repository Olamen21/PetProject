import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({ example: 'Huỳnh Thanh Thúy', description: 'Họ và tên' })
  full_name?: string;

  @ApiProperty({ example: '0901234567', description: 'Số điện thoại' })
  phone?: string;

  @ApiProperty({ example: 'https://image.com/avatar.png', required: false })
  avatar_url?: string;

  @ApiProperty({ example: 'Hà Nội', description: 'Địa chỉ' })
  address?: string;

  @ApiProperty({ example: '1990-01-01', description: 'Ngày sinh' })
  date_of_birth?: Date;

  @ApiProperty({
    example: 'Tôi là một bác sĩ thú y với hơn 10 năm kinh nghiệm...',
    description: 'Thông tin cá nhân',
  })
  bio?: string;

  @ApiProperty({
    example: ['thú cưng', 'chó mèo'],
    description: 'Các tag sở thích',
  })
  tags?: string;
  @ApiProperty({ example: 'Phòng khám A, Tầng 2', description: 'Phòng khám' })
  clinic_room?: string;
}
