import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NutritionModule } from './nutrition/nutrition.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Nutrition } from './nutrition/entities/nutrition.entity';

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
      database: 'pet_care_nutrition',
      entities: [Nutrition],
      synchronize: true,
      retryAttempts: 10,
      retryDelay: 3000,
    }),
    NutritionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
