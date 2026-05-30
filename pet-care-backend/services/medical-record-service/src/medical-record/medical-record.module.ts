import { Module } from '@nestjs/common';
import { MedicalRecordService } from './medical-record.service';
import { MedicalRecordController } from './medical-record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MedicalExamination } from './entities/medical_examinations.entity';
import { Prescription } from './entities/prescriptions.entity';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'SECRET_KEY_CUA_THUY',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([MedicalExamination, Prescription]),
  ],
  controllers: [MedicalRecordController],
  providers: [MedicalRecordService, JwtStrategy],
  exports: [MedicalRecordService],
})
export class MedicalRecordModule {}
