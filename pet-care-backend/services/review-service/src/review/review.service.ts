import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async create(
    createReviewDto: CreateReviewDto,
    user_id: number,
  ): Promise<Review> {
    const review = this.reviewRepository.create({
      ...createReviewDto,
      user_id: user_id,
    });
    return await this.reviewRepository.save(review);
  }

  async findAll(): Promise<Review[]> {
    return await this.reviewRepository.find();
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOne({ where: { id } });
    if (!review) {
      throw new NotFoundException(`Review #${id} not found`);
    }
    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const review = await this.findOne(id);
    Object.assign(review, updateReviewDto);
    return await this.reviewRepository.save(review);
  }

  async remove(id: number): Promise<void> {
    const review = await this.findOne(id);
    await this.reviewRepository.remove(review);
  }
  async findByVetId(id: number): Promise<Review[]> {
    return await this.reviewRepository.find({
      where: { vet_id: id },
    });
  }
  async calculateVetRating(
    vetId: number,
  ): Promise<{ averageRating: number; totalReviews: number }> {
    const result = await this.reviewRepository
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'average')
      .addSelect('COUNT(review.id)', 'count')
      .where('review.vet_id = :vetId', { vetId })
      .getRawOne<{ average: string | null; count: string }>();

    if (!result || result.average === null) {
      return {
        averageRating: 0.0,
        totalReviews: 0,
      };
    }

    return {
      averageRating: parseFloat(parseFloat(result.average).toFixed(1)),
      totalReviews: parseInt(result.count, 10),
    };
  }
}
