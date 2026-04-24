import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgresdb',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'pet_care_auth',
      entities: [User],
      synchronize: true,
      retryAttempts: 10,
      retryDelay: 3000,
    }),
    TypeOrmModule.forFeature([User]),
    

    JwtModule.register({
      secret: 'SECRET_KEY_CUA_THUY',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController], 
  providers: [AppService], 
})
export class AppModule {}