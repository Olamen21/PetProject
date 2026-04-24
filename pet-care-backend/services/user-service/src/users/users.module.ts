import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    UsersModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
