import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicalRecordModule } from './medical-record/medical-record.module';
import { MedicalExamination } from './medical-record/entities/medical_examinations.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Prescription } from './medical-record/entities/prescriptions.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgresdb',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'pet_care_medical_records',
      entities: [MedicalExamination, Prescription],
      synchronize: true,
      retryAttempts: 10,
      retryDelay: 3000,
    }),
    MedicalRecordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
