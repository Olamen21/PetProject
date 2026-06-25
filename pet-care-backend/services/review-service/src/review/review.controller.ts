import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';
import type { Request } from 'express';

@ApiTags('Review')
@ApiBearerAuth('token')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Create a review after appointment' })
  @Post('create-review')
  create(@Body() createReviewDto: CreateReviewDto, @Req() req: Request) {
    const userIdHeader = req.headers['x-user-id'];
    if (!userIdHeader) {
      throw new UnauthorizedException('User ID not found in request headers');
    }
    return this.reviewService.create(createReviewDto, +userIdHeader);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.VET)
  @ApiOperation({ summary: 'Get all reviews' })
  @Get('all')
  findAll() {
    return this.reviewService.findAll();
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.VET)
  @ApiOperation({ summary: 'Get review by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Update review by ID' })
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Delete review by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get all reviews by veterinarian ID' })
  @Get('review-vet/:id')
  findByVetId(@Param('id') id: string) {
    return this.reviewService.findByVetId(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.VET)
  @ApiOperation({ summary: 'Calculate average rating by veterinarian ID' })
  @Get('calculate-vet-rating/:id')
  calculateVetRating(@Param('id') id: string) {
    return this.reviewService.calculateVetRating(+id);
  }
}
