import { IsString, IsOptional, IsPhoneNumber } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  full_name?: string;

  @IsPhoneNumber('VN')
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  avatar_url?: string;
}
