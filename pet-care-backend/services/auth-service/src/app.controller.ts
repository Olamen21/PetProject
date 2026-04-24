import { Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; 
import { Body } from '@nestjs/common';
import { RegisterDto } from './auth/dto/register.dto';
import { AppService } from './app.service';
@ApiTags('Authentication')
@Controller('auth')
export class AppController {
  constructor(private readonly authService: AppService) {}

  @Post('register')
  @ApiOperation({ summary: 'Đăng ký tài khoản mới' }) 
  @ApiResponse({ status: 201, description: 'Đăng ký thành công' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @ApiOperation({ summary: 'Đăng nhập để lấy Access Token' })
   @ApiResponse({ status: 201, description: 'Đăng nhập thành công' })
  @Post('login')
  async login(@Body() dto: RegisterDto) {
    return this.authService.login(dto);
  }
}
