import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'admin@gmail.com',
    description: 'Email dùng để đăng ký',
  })
  email!: string;

  @ApiProperty({
    example: 'Password@123',
    description: 'Mật khẩu (tối thiểu 6 ký tự)',
  })
  password!: string;

  @ApiProperty({ example: 'admin', description: 'Họ và tên' })
  full_name!: string;
}
