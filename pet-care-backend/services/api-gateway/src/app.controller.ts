import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { Roles } from './auth/decorators/roles.decorator';
import { Role } from './auth/role.enum';

@Controller('admin')
export class AppController {
  @Get('dashboard')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getAdminData() {
    return { message: 'Chào Admin, đây là dữ liệu mật!' };
  }

  @Get('vet-zone')
  @Roles(Role.VET, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getVetData() {
    return { message: 'Chào Bác sĩ!' };
  }
}
