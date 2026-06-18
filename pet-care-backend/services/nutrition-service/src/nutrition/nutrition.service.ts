import {
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { CreateNutritionDto } from './dto/create-nutrition.dto';
import { UpdateNutritionDto } from './dto/update-nutrition.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Nutrition } from './entities/nutrition.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

interface IFoodSeed {
  food_name: string;
  calories: number;
  protein: number;
  fat: number;
  carb: number;
  species: string;
}

@Injectable()
export class NutritionService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Nutrition)
    private readonly nutritionRepository: Repository<Nutrition>,
  ) {}

  async onApplicationBootstrap() {
    try {
      const count = await this.nutritionRepository.count();

      if (count === 0) {
        console.log(
          '🔄 [Nutrition Service] DB trống. Đang tự động nạp dữ liệu từ file JSON...',
        );

        const jsonPath = path.join(__dirname, 'data', 'food_full.json');

        if (!fs.existsSync(jsonPath)) {
          console.warn(
            `⚠️ Không tìm thấy file JSON mẫu tại đường dẫn: ${jsonPath}`,
          );
          return;
        }

        const rawData = fs.readFileSync(jsonPath, 'utf-8');
        const foodsData = JSON.parse(rawData) as IFoodSeed[];

        const entities = foodsData.map((food) => {
          return this.nutritionRepository.create({
            food_name: food.food_name,
            calories: food.calories,
            protein: food.protein,
            fat: food.fat,
            carb: food.carb,
            species: food.species,
          });
        });

        await this.nutritionRepository.save(entities);
        console.log(
          `✅ Tự động khởi tạo thành công ${entities.length} món ăn vào DB!`,
        );
      } else {
        console.log(
          `ℹ️ [Nutrition Service] DB đã có sẵn ${count} món ăn, bỏ qua bước khởi tạo.`,
        );
      }
    } catch (error) {
      console.error(
        '❌ Lỗi xảy ra trong quá trình tự động khởi tạo dữ liệu:',
        error,
      );
    }
  }
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
