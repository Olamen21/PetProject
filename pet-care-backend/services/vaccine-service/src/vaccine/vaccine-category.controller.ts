import { VaccineCategoryService } from './vaccine-category.service';
import {
  Body,
  Controller,
  UseGuards,
  Post,
  Get,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { RolesGuard } from '../roles/roles.guard';
import { Role } from '../roles/role.enum';
import { Roles } from '../roles/roles.decorator';
import { VaccineCategoryDto } from './dto/create-vaccine-category.dto';

@ApiTags('Vaccine Category')
@ApiBearerAuth('token')
@Controller('vaccine-category')
export class VaccineCategoryController {
  constructor(
    private readonly vaccineCategoryService: VaccineCategoryService,
  ) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.VET)
  @Post('create-vaccine-category')
  @ApiOperation({ summary: 'Create new vaccine category (Admin and Vet only)' })
  async create(@Body() createVaccineCategoryDto: VaccineCategoryDto) {
    return await this.vaccineCategoryService.create(createVaccineCategoryDto);
  }

  @UseGuards(RolesGuard)
  @Get('all-vaccine-category')
  @ApiOperation({ summary: 'Get all vaccine categories' })
  async findAll() {
    return await this.vaccineCategoryService.findAll();
  }

  @UseGuards(RolesGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get vaccine category by ID' })
  async findOne(@Param('id') id: string) {
    return await this.vaccineCategoryService.findOne(+id);
  }

  @UseGuards(RolesGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete vaccine category by ID' })
  async remove(@Param('id') id: string) {
    return await this.vaccineCategoryService.remove(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.VET)
  @Patch(':id')
  @ApiOperation({
    summary: 'Update vaccine category by ID (Admin and Vet only)',
  })
  async update(
    @Param('id') id: string,
    @Body() updateVaccineCategoryDto: VaccineCategoryDto,
  ) {
    return await this.vaccineCategoryService.update(
      +id,
      updateVaccineCategoryDto,
    );
  }
}
