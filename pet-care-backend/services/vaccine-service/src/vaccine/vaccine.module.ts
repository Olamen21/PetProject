import { Module } from '@nestjs/common';
import { VaccineService } from './vaccine.service';
import { VaccineController } from './vaccine.controller';
import { PetVaccination } from './entities/vaccine.entity';
import { VaccineCategory } from './entities/vaccine-category.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaccineCategoryController } from './vaccine-category.controller';
import { VaccineCategoryService } from './vaccine-category.service';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'SECRET_KEY_CUA_THUY',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([PetVaccination, VaccineCategory]),
  ],
  controllers: [VaccineController, VaccineCategoryController],
  providers: [VaccineService, VaccineCategoryService, JwtStrategy],
  exports: [VaccineService, VaccineCategoryService],
})
export class VaccineModule {}
