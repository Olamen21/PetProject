import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateProfileDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '../roles/role.enum';
import { DoctorProfile } from './entities/doctor-profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(DoctorProfile)
    private doctorProfileRepository: Repository<DoctorProfile>,
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
  async applyToBeVet(
    userId: number,
    updateData: any,
    fileUrl?: string,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['doctorProfile'],
    });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }

    user.phone = updateData.phone;
    user.address = updateData.address;
    if (updateData.date_of_birth) {
      user.date_of_birth = new Date(updateData.date_of_birth);
    }
    user.role = Role.PENDING_VET;

    if (!user.doctorProfile) {
      user.doctorProfile = new DoctorProfile();
    }

    user.doctorProfile.degree = updateData.degree;
    user.doctorProfile.clinic_room = updateData.clinic_room;
    if (user.doctorProfile && updateData.experience_start_date) {
      user.doctorProfile.experience_start_date = new Date(
        updateData.experience_start_date,
      );
    }
    if (fileUrl) {
      user.doctorProfile.certificate_url = fileUrl;
    }

    console.log('Dữ liệu sắp lưu:', updateData);
    await this.doctorProfileRepository.save(user.doctorProfile);
    return this.usersRepository.save(user);
  }
}
