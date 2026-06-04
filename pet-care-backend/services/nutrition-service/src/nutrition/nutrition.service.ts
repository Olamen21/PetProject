import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNutritionDto } from './dto/create-nutrition.dto';
import { UpdateNutritionDto } from './dto/update-nutrition.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Nutrition } from './entities/nutrition.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NutritionService {
  constructor(
    @InjectRepository(Nutrition)
    private readonly nutritionRepository: Repository<Nutrition>,
  ) {}

  async create(createNutritionDto: CreateNutritionDto): Promise<Nutrition> {
    const nutr = this.nutritionRepository.create(createNutritionDto);
    return await this.nutritionRepository.save(nutr);
  }

  async findAll(): Promise<Nutrition[]> {
    return await this.nutritionRepository.find();
  }

  async findOne(id: number): Promise<Nutrition> {
    const nutr = await this.nutritionRepository.findOne({
      where: { food_id: id },
    });
    if (!nutr) {
      throw new NotFoundException(`Nutrition with id ${id} not found`);
    }
    return nutr;
  }

  async update(
    id: number,
    updateNutritionDto: UpdateNutritionDto,
  ): Promise<Nutrition> {
    const nutr = await this.findOne(id);
    const updated = Object.assign(nutr, updateNutritionDto);
    return await this.nutritionRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const nutr = await this.findOne(id);
    await this.nutritionRepository.remove(nutr);
  }
}
