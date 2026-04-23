import { Controller, Get, Body, Patch, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-user.dto';
import { Request } from 'express';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { Role } from '../roles/role.enum';
import { User } from './entities/user.entity';

interface RequestWithUser extends Request {
  user: { id: number; email: string; role: Role };
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  getProfile(@Req() req: RequestWithUser): Promise<User> {
    const userId = req.user.id;
    return this.usersService.findOne(userId);
  }

  @Patch('profile')
  updateProfile(
    @Req() req: RequestWithUser,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<User> {
    const userId = req.user.id;
    return this.usersService.updateProfile(userId, updateProfileDto);
  }

  @Get('all-users')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('vet-stats')
  @Roles(Role.VET, Role.ADMIN)
  @UseGuards(RolesGuard)
  getVetStats(): string {
    return 'Dữ liệu thống kê thú cưng';
  }
}
