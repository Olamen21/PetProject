import { Controller, Get, Body, Patch, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-user.dto';
import { Request } from 'express';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { Role } from '../roles/role.enum';
import { User } from './entities/user.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

interface RequestWithUser extends Request {
  user: { id: number; email: string; role: Role };
}

@ApiTags('Users')
@ApiBearerAuth('token')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Lấy thông tin cá nhân của User hiện tại' })
  @ApiResponse({ status: 200, description: 'Thành công', type: User })
  getProfile(@Req() req: RequestWithUser) {
    if (!req.user) {
      return {
        message:
          'Chưa có token nên chưa xác định được user, hãy đăng nhập để lấy token và thử lại',
        example_id: 'Dán một cái UUID từ database vào đây',
      };
    }
    return this.usersService.findOne(req.user.id);
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Cập nhật hồ sơ cá nhân' })
  updateProfile(
    @Req() req: RequestWithUser,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(req.user.id, updateProfileDto);
  }

  @Get('all-users')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Lấy danh sách tất cả người dùng (Chỉ Admin)' })
  findAll() {
    return this.usersService.findAll();
  }
}
