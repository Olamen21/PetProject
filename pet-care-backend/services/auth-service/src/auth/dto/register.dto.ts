import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'thuy@example.com', description: 'Email dùng để đăng ký' })
  email: string;

  @ApiProperty({ example: '123456', description: 'Mật khẩu (tối thiểu 6 ký tự)' })
  password: string;

  @ApiProperty({ example: 'Huỳnh Thanh Thúy', description: 'Họ và tên' })
  full_name: string;
}