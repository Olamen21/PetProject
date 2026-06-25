import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { BreedService } from './breed.service';
import { CreateBreedDto } from './dto/create-breed.dto';
import { RolesGuard } from '../roles/roles.guard';
import { Role } from '../roles/role.enum';
import { Roles } from '../roles/roles.decorator';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Breeds')
@ApiBearerAuth('token')
@Controller('breeds')
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.VET)
  @Post('create-breed')
  @ApiOperation({ summary: 'Create new breed (Admin and Vet only)' })
  async create(@Body() createBreedDto: CreateBreedDto) {
    return await this.breedService.create(createBreedDto);
  }

  @UseGuards(RolesGuard)
  @Get('all-breeds')
  @ApiOperation({ summary: 'Get all breeds' })
  async findAll() {
    return await this.breedService.findAll();
  }

  @UseGuards(RolesGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get breed by ID' })
  async findOne(@Param('id') id: string) {
    const breedId = Number(id);
    if (isNaN(breedId)) {
      throw new BadRequestException('Breed ID must be a valid number');
    }
    return await this.breedService.findOne(breedId);
  }

  @UseGuards(RolesGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete breed by ID' })
  async remove(@Param('id') id: string) {
    const breedId = Number(id);
    if (isNaN(breedId)) {
      throw new BadRequestException('Breed ID must be a valid number');
    }
    return await this.breedService.remove(breedId);
  }
}
