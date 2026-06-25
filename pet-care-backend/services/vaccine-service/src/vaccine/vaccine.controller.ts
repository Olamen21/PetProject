import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseArrayPipe,
  Patch,
} from '@nestjs/common';
import { VaccineService } from './vaccine.service';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';
import { PetVaccination } from './entities/vaccine.entity';
import { VaccinationStatus } from './constants/enums';
import { RolesGuard } from '../roles/roles.guard';

@ApiTags('Vaccine Pet')
@ApiBearerAuth('token')
@Controller('vaccine-pet')
export class VaccineController {
  constructor(private readonly vaccineService: VaccineService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Post('create-vaccine')
  @ApiOperation({ summary: 'Create vaccination schedule' })
  @ApiResponse({ status: 201, description: 'Success', type: PetVaccination })
  create(@Body() createVaccineDto: CreateVaccineDto) {
    return this.vaccineService.create(createVaccineDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.VET)
  @ApiOperation({
    summary: 'Get all vaccination schedules (Admin and Vet only)',
  })
  @Get('all-vaccine')
  findAll() {
    return this.vaccineService.findAll();
  }

  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get vaccines by list of Pet IDs for current user' })
  @Get('my-vaccines')
  getMyVaccines(
    @Query('petIds', new ParseArrayPipe({ items: Number })) petIds: number[],
  ) {
    return this.vaccineService.findByUser(petIds);
  }

  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get vaccines by Pet ID' })
  @Get('pet/:petId')
  findByPet(@Param('petId') petId: string) {
    return this.vaccineService.findPetById(+petId);
  }

  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get vaccine record by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vaccineService.findOne(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.VET)
  @Patch(':id/complete')
  @ApiOperation({ summary: 'Vet confirms vaccination completed' })
  markComplete(@Param('id') id: string) {
    return this.vaccineService.updateStatus(+id, VaccinationStatus.COMPLETED);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @Patch(':id/cancel')
  @ApiOperation({ summary: 'User or Vet cancels vaccination schedule' })
  cancel(@Param('id') id: string) {
    return this.vaccineService.updateStatus(+id, VaccinationStatus.CANCELLED);
  }

  @UseGuards(RolesGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete vaccination record by ID' })
  remove(@Param('id') id: string) {
    return this.vaccineService.remove(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.VET)
  @Get('suggest-next/:petId/:vaccineId')
  @ApiOperation({ summary: 'Suggest next vaccination schedule for a pet' })
  @ApiResponse({ status: 200, description: 'Suggested next schedule date' })
  async suggestNextSchedule(
    @Param('petId') petId: string,
    @Param('vaccineId') vaccineId: string,
  ) {
    return this.vaccineService.suggestNextSchedule(+petId, +vaccineId);
  }
}
