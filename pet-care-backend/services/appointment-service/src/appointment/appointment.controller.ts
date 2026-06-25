import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
  BadRequestException,
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
import { Role } from '../roles/role.enum';
import { Roles } from '../roles/roles.decorator';
import { Appointment } from './entities/appointment.entity';
import { RolesGuard } from '../roles/roles.guard';
import type { Request } from 'express';

@ApiTags('Appointment')
@ApiBearerAuth('token')
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.VET)
  @Post('create-appointment')
  @ApiOperation({ summary: 'Create a new appointment' })
  @ApiResponse({ status: 201, description: 'Success', type: Appointment })
  async create(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @Req() req: Request,
  ) {
    const userIdHeader = req.headers['x-user-id'];
    if (!userIdHeader) {
      throw new UnauthorizedException('User ID not found in headers');
    }
    const userId = Number(userIdHeader);
    if (isNaN(userId)) {
      throw new BadRequestException('User ID must be a valid number');
    }
    return this.appointmentService.create(createAppointmentDto, userId);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.VET)
  @ApiOperation({ summary: 'Get all appointments' })
  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.VET)
  @ApiOperation({ summary: 'Get appointment details by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.VET)
  @ApiOperation({ summary: 'Update appointment' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.VET)
  @ApiOperation({ summary: 'Delete appointment' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.VET, Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get appointments by veterinarian ID' })
  @Get('vet/:vetId')
  findByVetId(@Param('vetId') vetId: string) {
    return this.appointmentService.findByVetId(+vetId);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.VET, Role.ADMIN)
  @ApiOperation({ summary: 'Confirm appointment' })
  @Patch(':id/confirm')
  confirmAppointment(@Param('id') id: string) {
    return this.appointmentService.confirmAppointment(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.VET, Role.ADMIN)
  @ApiOperation({ summary: 'Complete appointment' })
  @Patch(':id/complete')
  completeAppointment(@Param('id') id: string) {
    return this.appointmentService.completedAppointment(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.VET, Role.ADMIN)
  @ApiOperation({ summary: 'Cancel appointment' })
  @Patch(':id/cancel')
  cancelAppointment(@Param('id') id: string) {
    return this.appointmentService.cancelAppointment(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Get appointments for current user' })
  @Get('user/current')
  findByUserId(@Req() req: Request) {
    const currentUserIdHeader = req.headers['x-user-id'];
    if (!currentUserIdHeader) {
      throw new UnauthorizedException('User ID not found in headers');
    }
    const currentUserId = Number(currentUserIdHeader);
    if (isNaN(currentUserId)) {
      throw new BadRequestException('User ID must be a valid number');
    }
    return this.appointmentService.findByUserId(currentUserId);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Mark review as completed' })
  @Patch('review/complete/:id')
  completeReview(@Param('id') id: string) {
    return this.appointmentService.markCompleteReview(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.VET)
  @ApiOperation({ summary: 'Count completed appointments' })
  @Get('count-appointment/:id')
  countCompletedAppointments(@Param('id') id: string) {
    return this.appointmentService.countCompletedAppointments(+id);
  }
}
