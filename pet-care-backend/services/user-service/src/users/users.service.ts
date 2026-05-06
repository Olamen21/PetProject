import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateProfileDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '../roles/role.enum';
import { DoctorProfile } from './entities/doctor-profile.entity';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(DoctorProfile)
    private doctorProfileRepository: Repository<DoctorProfile>,
  ) {}

  //lấy thông tin người dùng theo ID
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

  //cập nhật thông tin người dùng
  async updateProfile(
    id: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['doctorProfile'],
    });
    if (!user) {
      throw new NotFoundException(`Không tìm thấy người dùng có ID ${id}`);
    }
    if (updateProfileDto.full_name) user.full_name = updateProfileDto.full_name;
    if (updateProfileDto.phone) user.phone = updateProfileDto.phone;
    if (updateProfileDto.address) user.address = updateProfileDto.address;
    if (updateProfileDto.date_of_birth)
      user.date_of_birth = updateProfileDto.date_of_birth;
    if (updateProfileDto.avatar_url)
      user.avatar_url = updateProfileDto.avatar_url;

    if (user.role === Role.VET) {
      if (!user.doctorProfile) {
        user.doctorProfile = new DoctorProfile();
      }
      if (updateProfileDto.bio) user.doctorProfile.bio = updateProfileDto.bio;
      if (updateProfileDto.clinic_room)
        user.doctorProfile.clinic_room = updateProfileDto.clinic_room;

      if (updateProfileDto.tags) {
        user.doctorProfile.tags = (updateProfileDto.tags as string)
          .split(',')
          .map((tag) => tag.trim())
          .join(', '); // Chuyển ['A', 'B'] thành "A, B"
      }
    }

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

  //lấy tất cả người dùng (chỉ admin mới có quyền)
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  //hàm băm mật khẩu
  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  //thay đổi vai trò người dùng (chỉ admin mới có quyền)
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
      throw new NotFoundException('Không tìm thấy người dùng');
    }

    const isMatch = await bcrypt.compare(dto.oldPassword, user.password_hash);

    if (!isMatch) {
      throw new BadRequestException('Mật khẩu hiện tại không chính xác');
    }

    const isSame = await bcrypt.compare(dto.newPassword, user.password_hash);
    if (isSame) {
      throw new BadRequestException(
        'Mật khẩu mới phải khác mật khẩu hiện tại.',
      );
    }

    user.password_hash = await this.hashPassword(dto.newPassword);

    await this.usersRepository.save(user);
  }
}
