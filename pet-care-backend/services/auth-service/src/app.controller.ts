import { Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Body } from '@nestjs/common';
import { RegisterDto } from './auth/dto/register.dto';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.appService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: RegisterDto) {
    return this.appService.login(dto);
  }
}
