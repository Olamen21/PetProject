import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { CloudinaryService } from './cloudinary.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';
import { Breed } from './entities/breed.entity';
import { BreedController } from './breed.controller';
import { BreedService } from './breed.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'SECRET_KEY_CUA_THUY',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([Pet, Breed]),
  ],
  controllers: [PetsController, BreedController],
  providers: [PetsService, CloudinaryService, JwtStrategy, BreedService],
  exports: [PetsService, CloudinaryService, BreedService],
})
export class PetsModule {}
