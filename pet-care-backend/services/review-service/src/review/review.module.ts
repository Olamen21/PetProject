import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Review } from './entities/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'SECRET_KEY_CUA_THUY',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([Review]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService, JwtStrategy],
  exports: [ReviewService],
})
export class ReviewModule {}
