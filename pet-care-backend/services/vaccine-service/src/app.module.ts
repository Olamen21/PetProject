import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VaccineModule } from './vaccine/vaccine.module';
import { PetVaccination } from './vaccine/entities/vaccine.entity';
import { VaccineCategory } from './vaccine/entities/vaccine-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

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
      database: 'pet_care_vaccine',
      entities: [PetVaccination, VaccineCategory],
      synchronize: true,
      retryAttempts: 10,
      retryDelay: 3000,
    }),
    VaccineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
