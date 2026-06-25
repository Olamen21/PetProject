import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { MedicalRecordService } from './medical-record.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { RolesGuard } from '../roles/roles.guard';
import { Role } from '../roles/role.enum';
import { Roles } from '../roles/roles.decorator';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import type { Request } from 'express';

@ApiTags('Medical Records')
@ApiBearerAuth('token')
@Controller('medical-record')
export class MedicalRecordController {
  constructor(private readonly medicalRecordService: MedicalRecordService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.VET)
  @ApiOperation({
    summary: 'Create new medical record for pet (Admin and Vet only)',
  })
  @Post('create-medical-record')
  create(
    @Body() createMedicalRecordDto: CreateMedicalRecordDto,
    @Req() req: Request,
  ) {
    const vetIdHeader = req.headers['x-user-id'];
    if (!vetIdHeader) {
      throw new UnauthorizedException('Vet ID not found in request headers');
    }
    const vetId = Number(vetIdHeader);
    return this.medicalRecordService.create(createMedicalRecordDto, vetId);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.VET)
  @ApiOperation({
    summary: 'Get all medical records (Admin and Vet only)',
  })
  @Get('all')
  findAll() {
    return this.medicalRecordService.findAll();
  }

  @ApiOperation({
    summary: 'Get medical record by ID',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalRecordService.findOne(+id);
  }

  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalRecordService.remove(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.VET, Role.USER)
  @ApiOperation({
    summary: 'Get current medications of pet by Pet ID',
  })
  @Get('pet/:petId/current-medications')
  async getCurrentMedications(@Param('petId') petId: string) {
    return this.medicalRecordService.findCurrentMedications(+petId);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.VET, Role.USER)
  @ApiOperation({
    summary: 'Get all medical records of pet by Pet ID',
  })
  @Get('pet/medical-record/:petId')
  async getAllMedicalRecordByPetID(@Param('petId') petId: string) {
    return this.medicalRecordService.findByPetId(+petId);
  }
}
