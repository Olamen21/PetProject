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
} from '@nestjs/common';
import { VaccineService } from './vaccine.service';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';
import { PetVaccination } from './entities/vaccine.entity';

@ApiTags('Vaccine')
@ApiBearerAuth('token')
@Controller('vaccine')
export class VaccineController {
  constructor(private readonly vaccineService: VaccineService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Post('create-vaccine')
  @ApiOperation({ summary: 'Tạo lịch tiêm vaccine' })
  @ApiResponse({ status: 201, description: 'Thành công', type: PetVaccination })
  create(@Body() createVaccineDto: CreateVaccineDto) {
    return this.vaccineService.create(createVaccineDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN, Role.VET)
  @ApiOperation({ summary: 'Xem tất cả lịch tiêm vaccine (chỉ admin và vet)' })
  @Get('all-vaccine')
  findAll() {
    return this.vaccineService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Lấy vaccine theo danh sách Pet của User hiện tại' })
  @Get('my-vaccines')
  getMyVaccines(
    @Query('petIds', new ParseArrayPipe({ items: Number })) petIds: number[],
  ) {
    return this.vaccineService.findByUser(petIds);
  }

  @UseGuards(JwtAuthGuard)
  @Get('pet/:petId')
  findByPet(@Param('petId') petId: string) {
    return this.vaccineService.findPetById(+petId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vaccineService.findOne(+id);
  }

  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN, Role.VET)
  // @Patch(':id/complete')
  // @ApiOperation({ summary: 'Vet xác nhận đã tiêm xong' })
  // markComplete(@Param('id') id: string) {
  //   return this.vaccineService.updateStatus(+id, VaccinationStatus.COMPLETED);
  // }
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.USER, Role.ADMIN)
  // @Patch(':id/cancel')
  // @ApiOperation({ summary: 'User hủy lịch tiêm' })
  // cancel(@Param('id') id: string) {
  //   return this.vaccineService.updateStatus(+id, VaccinationStatus.CANCELLED);
  // }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vaccineService.remove(+id);
  }
}
