import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateProfileDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { DoctorProfile } from './entities/doctor-profile.entity';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ApplyToBeVetDto } from './entities/apply-to-be-vet.dto';
import { Role } from '../roles/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(DoctorProfile)
    private doctorProfileRepository: Repository<DoctorProfile>,
  ) {}

  private calculateYearsOfExperience(
    startDate: Date | string | undefined | null,
  ): number {
    if (!startDate) return 0;
    const start = new Date(startDate);
    const now = new Date();

    if (start.getTime() > now.getTime()) return 0;

    const diffInMs = now.getTime() - start.getTime();
    const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(diffInYears);
  }

  // lấy user theo id
  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['doctorProfile'],
    });
    if (!user) {
      throw new BadRequestException(`User with ID ${id} not found`);
    }
    return user;
  }

  async updateProfile(
    id: number,
    updateProfileDto: UpdateProfileDto,
    fileUrl?: string,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['doctorProfile'],
    });
    if (!user) {
      throw new BadRequestException(`User with ID ${id} not found`);
    }
    if (updateProfileDto.full_name) user.full_name = updateProfileDto.full_name;
    if (updateProfileDto.phone) user.phone = updateProfileDto.phone;
    if (updateProfileDto.address) user.address = updateProfileDto.address;
    if (updateProfileDto.date_of_birth) {
      user.date_of_birth = new Date(updateProfileDto.date_of_birth);
    }
    if (fileUrl) {
      user.avatar_url = fileUrl;
    }

    if (user.role === Role.VET) {
      if (!user.doctorProfile) {
        user.doctorProfile = new DoctorProfile();
      }
      if (updateProfileDto.bio) user.doctorProfile.bio = updateProfileDto.bio;
      if (updateProfileDto.clinic_room)
        user.doctorProfile.clinic_room = updateProfileDto.clinic_room;

      if (updateProfileDto.tags) {
        user.doctorProfile.tags = updateProfileDto.tags
          .split(',')
          .map((tag) => tag.trim())
          .join(', ');
      }
    }

    return this.usersRepository.save(user);
  }

  async applyToBeVet(
    userId: number,
    updateData: ApplyToBeVetDto,
    fileUrl?: string,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['doctorProfile'],
    });
    if (!user) {
      throw new BadRequestException('User not found');
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

    if (updateData.experience_start_date) {
      user.doctorProfile.experience_start_date = new Date(
        updateData.experience_start_date,
      );

      user.doctorProfile.years_of_experience = this.calculateYearsOfExperience(
        user.doctorProfile.experience_start_date,
      );
    }

    if (fileUrl) {
      user.doctorProfile.certificate_url = fileUrl;
    }

    await this.doctorProfileRepository.save(user.doctorProfile);
    return this.usersRepository.save(user);
  }

  // lấy tất cả user
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  //lấy tất cả vets
  async findAllVets(): Promise<User[]> {
    return this.usersRepository.find({
      where: { role: Role.VET },
      relations: ['doctorProfile'],
    });
  }

  async findVetById(id: number): Promise<User> {
    const vet = await this.usersRepository.findOne({
      where: { id, role: Role.VET },
      relations: ['doctorProfile'],
    });

    if (!vet) {
      throw new BadRequestException(`Veterinarian with ID ${id} not found`);
    }

    return vet;
  }
  async findPendingVetById(id: number): Promise<User> {
    const vet = await this.usersRepository.findOne({
      where: { id, role: Role.PENDING_VET },
      relations: ['doctorProfile'],
    });

    if (!vet) {
      throw new BadRequestException(`Pending vet with ID ${id} not found`);
    }

    return vet;
  }

  // Hash password
  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  // chuyển role của user
  async changeRole(id: number, newRole: Role): Promise<User> {
    const user = await this.findOne(id);
    user.role = newRole;

    return this.usersRepository.save(user);
  }

  async changePassword(userId: number, dto: ChangePasswordDto): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      select: ['id', 'password_hash'],
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isMatch = await bcrypt.compare(dto.oldPassword, user.password_hash);

    if (!isMatch) {
      throw new BadRequestException('Current password is incorrect');
    }

    const isSame = await bcrypt.compare(dto.newPassword, user.password_hash);
    if (isSame) {
      throw new BadRequestException(
        'New password must be different from the current password.',
      );
    }

    user.password_hash = await this.hashPassword(dto.newPassword);

    await this.usersRepository.save(user);
  }
}
