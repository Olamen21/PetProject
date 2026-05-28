import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/roles/role.enum';
import { Roles } from '../roles/roles.decorator';
import { Appointment } from './entities/appointment.entity';

@ApiTags('Appointment')
@ApiBearerAuth('token')
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN, Role.USER, Role.VET)
  @Post('create-appointment')
  @ApiOperation({ summary: 'Tạo lịch hẹn khám bệnh' })
  @ApiResponse({ status: 201, description: 'Thành công', type: Appointment })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN, Role.USER, Role.VET)
  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN, Role.USER, Role.VET)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }
}
