import { ApiProperty } from '@nestjs/swagger';

export class UpdatePetDto {
  @ApiProperty({
    example: 'Bơ',
    description: 'Tên của thú cưng',
  })
  name!: string;
  @ApiProperty({
    example: 'mèo',
    description: 'Giống loài của thú cưng',
  })
  species!: string;

  @ApiProperty({
    example: 'mèo mướp',
    description: 'Giống loài của thú cưng',
  })
  breed!: string;

  @ApiProperty({
    example: 'đực',
    description: 'Giới tính của thú cưng',
  })
  gender!: string;

  @ApiProperty({
    example: '2020-06-28',
    description: 'Sinh nhật của thú cưng',
  })
  date_of_birth!: Date;

  @ApiProperty({
    example: 'false',
    description: 'Thú cưng đã triệt sản chưa',
  })
  neutered!: boolean;

  @ApiProperty({
    example: 'cà rốt',
    description: 'Thực phẩm dị ứng',
  })
  allergies?: string;
}
