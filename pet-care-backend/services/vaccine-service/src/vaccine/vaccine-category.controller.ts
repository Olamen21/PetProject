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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { Role } from '../roles/role.enum';
import { Roles } from '../roles/roles.decorator';
import { VaccineCategoryDto } from './dto/create-vaccine-category.dto';

@ApiTags('Vaccine')
@ApiBearerAuth('token')
@Controller('vaccine-category')
export class VaccineCategoryController {
  constructor(
    private readonly vaccineCategoryService: VaccineCategoryService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.VET)
  @Post()
  async create(@Body() createVaccineCategoryDto: VaccineCategoryDto) {
    return await this.vaccineCategoryService.create(createVaccineCategoryDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return await this.vaccineCategoryService.findAll();
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.vaccineCategoryService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.vaccineCategoryService.remove(+id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.VET)
  @Patch(':id')
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
