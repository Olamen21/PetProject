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
import { RolesGuard } from 'src/roles/roles.guard';
interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email?: string;
    name?: string;
  };
}
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
  async create(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.id;
    return this.appointmentService.create(createAppointmentDto, +userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Xem tất cả lịch hẹn' })
  @Roles(Role.ADMIN, Role.VET)
  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.VET)
  @ApiOperation({ summary: 'Xem chi tiết lịch hẹn theo id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.VET)
  @ApiOperation({ summary: 'Cập nhật lịch hẹn' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.VET)
  @ApiOperation({ summary: 'Xóa lịch hẹn' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.VET, Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Xem lịch hẹn theo id của bác sĩ' })
  @Get('vet/:vetId')
  findByVetId(@Param('vetId') vetId: string) {
    return this.appointmentService.findByVetId(+vetId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.VET, Role.ADMIN)
  @ApiOperation({ summary: 'Xác nhận lịch hẹn' })
  @Patch(':id/confirm')
  confirmAppointment(@Param('id') id: string) {
    return this.appointmentService.confirmAppointment(+id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.VET, Role.ADMIN)
  @ApiOperation({ summary: 'Hoàn thành lịch hẹn' })
  @Patch(':id/complete')
  completeAppointment(@Param('id') id: string) {
    return this.appointmentService.completedAppointment(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.VET, Role.ADMIN)
  @ApiOperation({ summary: 'Hủy lịch hẹn' })
  @Patch(':id/cancel')
  cancelAppointment(@Param('id') id: string) {
    return this.appointmentService.cancelAppointment(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Xem lịch hẹn theo id của user hiện tại' })
  @Get('user/:userId')
  findByUserId(@Req() req: AuthenticatedRequest) {
    const currentUserId = req.user.id;

    return this.appointmentService.findByUserId(+currentUserId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Xác nhận đã đánh giá' })
  @Patch('review/complete/:id')
  completeReview(@Param('id') id: string) {
    return this.appointmentService.markCompleteReview(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.VET)
  @ApiOperation({ summary: 'Số lượt khám' })
  @Get('count-appointment/:id')
  countCompletedAppointments(@Param('id') id: string) {
    return this.appointmentService.countCompletedAppointments(+id);
  }
}
