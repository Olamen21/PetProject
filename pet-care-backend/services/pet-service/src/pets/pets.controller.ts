import { RolesGuard } from '../roles/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CloudinaryService } from './cloudinary.service';
import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Pet } from './entities/pet.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { Role } from '../roles/role.enum';
import { Roles } from '../roles/roles.decorator';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email?: string;
    name?: string;
  };
}

@ApiTags('Pets')
@ApiBearerAuth('token')
@Controller('pets')
export class PetsController {
  constructor(
    private readonly petsService: PetsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('pets')
  @ApiOperation({ summary: 'lấy danh sách tất cả thú cưng của user hiện tại' })
  async getMyPets(@Req() req: AuthenticatedRequest) {
    const userId = req.user.id;

    return this.petsService.findAllByOwner(+userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.VET)
  @Get('all-pets')
  @ApiOperation({ summary: 'lấy danh sách tất cả thú cưng (chỉ Admin và Vet)' })
  findAll() {
    return this.petsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.VET)
  @Get('user/:userId')
  @ApiOperation({
    summary: 'lấy danh sách thú cưng theo user (chỉ Admin và Vet)',
  })
  async findByOwner(@Param('userId') userId: string) {
    return this.petsService.findAllByOwner(+userId);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN, Role.USER)
  @UseInterceptors(FileInterceptor('file'))
  @Post('create-pet')
  @ApiOperation({ summary: 'Tạo hồ sơ thú cưng mới' })
  @ApiResponse({ status: 201, description: 'Thành công', type: Pet })
  async create(
    @Body() createPetDto: CreatePetDto,
    @Req() req: AuthenticatedRequest,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const ownerId = req.user.id;
    let imageUrl: string | undefined;
    if (file) {
      const imageUrlFromCloudinary =
        await this.cloudinaryService.uploadFile(file);
      imageUrl = imageUrlFromCloudinary;
    }
    return this.petsService.create(createPetDto, +ownerId, imageUrl);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Tìm thông tin hồ sơ của thú cưng' })
  @Get(':petId')
  findOne(@Param('petId') petId: string) {
    return this.petsService.findOne(+petId);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'xóa hồ sơ thú cưng' })
  @Delete(':petId')
  remove(@Param('petId') petId: string) {
    return this.petsService.remove(+petId);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN, Role.USER)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Cập nhật hồ sơ thú cưng' })
  @Patch(':petId')
  async update(
    @Param('petId') petId: string,
    @Body() body,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    //  console.log('User từ Request:', req.pet);
    console.log('--- NHẬN REQUEST ---');
    console.log('Body:', body);
    console.log('File:', file);
    let imageUrl: string | undefined;
    if (file) {
      const imageUrlFromCloudinary =
        await this.cloudinaryService.uploadFile(file);
      imageUrl = imageUrlFromCloudinary;
    }

    return this.petsService.update(+petId, body, imageUrl);
  }
}
