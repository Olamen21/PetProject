import {
  Controller,
  Get,
  Body,
  Patch,
  Req,
  UseGuards,
  Param,
  UploadedFile,
  UseInterceptors,
  Post,
  UnauthorizedException,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-user.dto';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { Role } from '../roles/role.enum';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { CloudinaryService } from './cloudinary.service';
import { ChangePasswordDto } from './dto/change-password.dto';

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email?: string;
    name?: string;
  };
}

@ApiTags('Users')
@ApiBearerAuth('token')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Lấy thông tin cá nhân của User hiện tại' })
  @ApiResponse({ status: 201, description: 'Thành công', type: User })
  async getProfile(@Req() req: AuthenticatedRequest) {
    if (!req.user) {
      return {
        success: false,
        message: 'không tìm thấy User từ Token này!',
      };
    }

    // const userId = req.user.id || req.user.sub;
    const userId = req.user.id;


    console.log('ID sẽ dùng để tìm trong DB:', userId);

    return this.usersService.findOne(+userId);
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Request() req: AuthenticatedRequest,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    console.log('User từ Request:', req.user);

    if (!req.user || !req.user.id) {
      throw new UnauthorizedException(
        'Không tìm thấy thông tin user trong token',
      );
    }

    return this.usersService.updateProfile(+req.user.id, updateProfileDto);
  }

  @Get('all-users')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Lấy danh sách tất cả người dùng (Chỉ Admin)' })
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id/assign-role')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async assignRole(@Param('id') id: number, @Body('role') role: Role) {
    return this.usersService.changeRole(id, role);
  }

  @Post('apply-vet')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async applyVet(
    @Req() req: AuthenticatedRequest,
    @Body() body,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imageUrl = await this.cloudinaryService.uploadFile(file);

    return this.usersService.applyToBeVet(+req.user.id, body, imageUrl);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  async changePassword(
    @Request() req: AuthenticatedRequest,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    await this.usersService.changePassword(+req.user.id, changePasswordDto);
    return { message: 'Đổi mật khẩu thành công!' };
  }
}
