import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateProfileDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '../roles/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['doctorProfile'],
    });
    if (!user) {
      throw new NotFoundException(`Không tìm thấy người dùng có ID ${id}`);
    }
    return user;
  }

  async updateProfile(
    id: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<User> {
    const user = await this.findOne(id);

    Object.assign(user, updateProfileDto);

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
  async changeRole(id: number, newRole: Role): Promise<User> {
    const user = await this.findOne(id);
    user.role = newRole;

    return this.usersRepository.save(user);
  }
}
