import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreatePetDto {
  @ApiProperty({
    example: 'Bơ',
    description: 'Tên của thú cưng',
  })
  name!: string;

  @ApiProperty({
    example: 'Dog',
    description: 'Loài (Dog hoặc Cat)',
  })
  species!: string;

  @ApiProperty({
    example: 'Male',
    description: 'Giới tính của thú cưng (Male/Female)',
  })
  gender!: string;

  @ApiProperty({
    example: '2020-06-28',
    description: 'Sinh nhật của thú cưng (Định dạng YYYY-MM-DD)',
  })
  date_of_birth!: Date;
  @ApiProperty({
    example: true,
    description: 'Thú cưng đã triệt sản chưa',
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  neutered!: boolean;

  @ApiProperty({
    example: 15,
    description: 'Chiều cao của thú cưng (cm)',
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  height!: number;

  @ApiProperty({
    example: 4,
    description: 'Cân nặng của thú cưng (kg)',
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  weight!: number;

  @ApiProperty({
    example: 1,
    description: 'ID của giống loài (Lấy từ bảng Breed)',
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  breed_id!: number;
  @ApiProperty({
    example: 'cà rốt',

    description: 'Thực phẩm dị ứng',
  })
  allergies?: string;
  @ApiProperty({
    example: '',

    description: '',
  })
  avatar_url?: string;
}
