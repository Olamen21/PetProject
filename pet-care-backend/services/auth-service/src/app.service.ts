import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './auth/entities/user.entity';
import { RegisterDto } from './auth/dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async register(dto: RegisterDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new BadRequestException('User đã tồn tại');
    }

    const hashedPassword = await this.hashPassword(dto.password);

    const newUser = new User();
    newUser.email = dto.email;
    newUser.full_name = dto.full_name;
    newUser.password_hash = hashedPassword;

    const savedUser = await this.userRepository.save(newUser);

    const payload = {
      sub: savedUser.id,
      email: savedUser.email,
      role: savedUser.role,
    };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      user: savedUser,
      access_token: access_token,
    };
  }

  async login(dto: { email: string; password: string }) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (!user) {
      throw new BadRequestException('Email không tồn tại!');
    }
    console.log('Password nhập:', dto.password);
    console.log('Hash trong DB:', user.password_hash);
    const isMatch = await bcrypt.compare(dto.password, user.password_hash);
    console.log('Kết quả so sánh:', isMatch);

    if (!isMatch) {
      throw new BadRequestException('Sai mật khẩu!');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      message: 'Login thành công!',
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        full_name: user.full_name,
      },
    };
  }
}
