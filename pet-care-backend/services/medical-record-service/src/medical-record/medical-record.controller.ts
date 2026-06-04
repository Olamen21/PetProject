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
import { MedicalRecordService } from './medical-record.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { Role } from '../roles/role.enum';
import { Roles } from '../roles/roles.decorator';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email?: string;
    name?: string;
  };
}
@ApiTags('Medical Records')
@ApiBearerAuth('token')
@Controller('medical-record')
export class MedicalRecordController {
  constructor(private readonly medicalRecordService: MedicalRecordService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.VET)
  @ApiOperation({
    summary: 'Tạo mới hồ sơ y tế cho thú cưng (chỉ Admin và Vet)',
  })
  @Post('create-medical-record')
  create(
    @Body() createMedicalRecordDto: CreateMedicalRecordDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const vetId = req.user.id;
    return this.medicalRecordService.create(createMedicalRecordDto, +vetId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.VET)
  @ApiOperation({
    summary: 'Lấy danh sách tất cả hồ sơ y tế (chỉ Admin và Vet)',
  })
  @Get('all')
  findAll() {
    return this.medicalRecordService.findAll();
  }

  @ApiOperation({
    summary: 'Lấy thông tin hồ sơ y tế theo ID',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalRecordService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMedicalRecordDto: UpdateMedicalRecordDto,
  ) {
    return this.medicalRecordService.update(+id, updateMedicalRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalRecordService.remove(+id);
  }
}
