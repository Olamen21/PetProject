import { RolesGuard } from '../roles/roles.guard';
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
  UnauthorizedException,
  BadRequestException,
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
import type { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Pets')
@ApiBearerAuth('token')
@Controller('pets')
export class PetsController {
  constructor(
    private readonly petsService: PetsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @UseGuards(RolesGuard)
  @Get('pets')
  @ApiOperation({ summary: 'Get all pets of current user' })
  async getMyPets(@Req() req: Request) {
    const userIdHeader = req.headers['x-user-id'];
    if (!userIdHeader) {
      throw new UnauthorizedException('User ID not found in request headers');
    }
    const userId = Number(userIdHeader);
    return this.petsService.findAllByOwner(userId);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.VET)
  @Get('all-pets')
  @ApiOperation({ summary: 'Get all pets (Admin and Vet only)' })
  findAll() {
    return this.petsService.findAll();
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.VET)
  @Get('user/:userId')
  @ApiOperation({ summary: 'Get pets by user ID (Admin and Vet only)' })
  async findByOwner(@Param('userId') userId: string) {
    const id = Number(userId);
    if (isNaN(id)) {
      throw new BadRequestException('User ID must be a valid number');
    }
    return this.petsService.findAllByOwner(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Post('create-pet')
  @ApiOperation({ summary: 'Create new pet profile' })
  @ApiResponse({ status: 201, description: 'Success', type: Pet })
  async create(@Body() createPetDto: CreatePetDto, @Req() req: Request) {
    const ownerIdHeader = req.headers['x-user-id'];
    if (!ownerIdHeader) {
      throw new UnauthorizedException('User ID not found in request headers');
    }
    const ownerId = Number(ownerIdHeader);
    if (isNaN(ownerId)) {
      throw new BadRequestException('User ID must be a valid number');
    }

    return this.petsService.create(createPetDto, ownerId);
  }

  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get pet profile by ID' })
  @Get(':petId')
  findOne(@Param('petId') petId: string) {
    const id = Number(petId);
    if (isNaN(id)) {
      throw new BadRequestException('Pet ID must be a valid number');
    }
    return this.petsService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Delete pet profile by ID' })
  @Delete(':petId')
  remove(@Param('petId') petId: string) {
    const id = Number(petId);
    if (isNaN(id)) {
      throw new BadRequestException('Pet ID must be a valid number');
    }
    return this.petsService.remove(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Update pet profile by ID' })
  @Patch(':petId')
  async update(
    @Param('petId') petId: string,
    @Body() body,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const id = Number(petId);
    if (isNaN(id)) {
      throw new BadRequestException('Pet ID must be a valid number');
    }
    let imageUrl: string | undefined;
    if (file) {
      imageUrl = await this.cloudinaryService.uploadFile(file);
    }
    return this.petsService.update(id, body, imageUrl);
  }
}
