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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { User } from './entities/user.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { CloudinaryService } from './cloudinary.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Role } from '../roles/role.enum';
import type { Request } from 'express';

@ApiTags('Users')
@ApiBearerAuth('token')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @UseGuards(RolesGuard)
  @Get('profile')
  @Roles(Role.ADMIN, Role.VET, Role.USER)
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Success', type: User })
  async getProfile(@Req() req: Request) {
    const userId = req.headers['x-user-id'];

    if (!userId) {
      return {
        success: false,
        message: 'User ID not found in request headers!',
      };
    }

    console.log('ID used to query DB:', userId);

    return this.usersService.findOne(+userId);
  }

  @Patch('profile')
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  async updateProfile(
    @Req() req: Request,
    @Body() body,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const userId = req.headers['x-user-id'];

    if (!userId) {
      throw new UnauthorizedException(
        'User information not found in request headers',
      );
    }

    let imageUrl: string | undefined;
    if (file) {
      imageUrl = await this.cloudinaryService.uploadFile(file);
    }

    return this.usersService.updateProfile(+userId, body, imageUrl);
  }

  @Get('all-users')
  @Roles(Role.ADMIN, Role.VET, Role.USER)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get all users (Admin only)' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('all-vets')
  @Roles(Role.ADMIN, Role.VET, Role.USER)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get all veterinarians' })
  findAllVets() {
    return this.usersService.findAllVets();
  }

  @Get('vet/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.VET, Role.USER)
  @ApiOperation({ summary: 'Get veterinarian by ID' })
  findVetById(@Param('id') id: number) {
    return this.usersService.findVetById(id);
  }

  @Patch(':id/assign-role')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async assignRole(@Param('id') id: number, @Body('role') role: Role) {
    return this.usersService.changeRole(id, role);
  }

  @Post('apply-vet')
  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  async applyVet(
    @Req() req: Request,
    @Body() body,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const userId = req.headers['x-user-id'];

    if (!userId) {
      throw new UnauthorizedException(
        'User information not found in request headers',
      );
    }

    const imageUrl = await this.cloudinaryService.uploadFile(file);

    return this.usersService.applyToBeVet(+userId, body, imageUrl);
  }

  @UseGuards(RolesGuard)
  @Patch('change-password')
  async changePassword(
    @Req() req: Request,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const userId = req.headers['x-user-id'];

    if (!userId) {
      throw new UnauthorizedException(
        'User information not found in request headers',
      );
    }

    await this.usersService.changePassword(+userId, changePasswordDto);
    return { message: 'Password changed successfully!' };
  }
}
