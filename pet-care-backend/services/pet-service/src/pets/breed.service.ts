import {
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Breed } from './entities/breed.entity';
import { CreateBreedDto } from './dto/create-breed.dto';
import * as fs from 'fs';
import * as path from 'path';

interface Breeds {
  name: string;
  description: string;
  species: string;
}
@Injectable()
export class BreedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}
  async onApplicationBootstrap() {
    try {
      const count = await this.breedRepository.count();

      if (count === 0) {
        console.log(
          '🔄 [Pet Service] DB trống. Đang tự động nạp dữ liệu từ file JSON...',
        );

        const jsonPath = path.join(__dirname, 'data', 'pet_breeds.json');

        if (!fs.existsSync(jsonPath)) {
          console.warn(
            `⚠️ Không tìm thấy file JSON mẫu tại đường dẫn: ${jsonPath}`,
          );
          return;
        }

        const rawData = fs.readFileSync(jsonPath, 'utf-8');
        const foodsData = JSON.parse(rawData) as Breeds[];

        const entities = foodsData.map((breed) => {
          return this.breedRepository.create({
            name: breed.name,
            description: breed.description,
            species: breed.species,
          });
        });

        await this.breedRepository.save(entities);
        console.log(
          `✅ Tự động khởi tạo thành công ${entities.length} giống loài!`,
        );
      } else {
        console.log(
          `ℹ️ [Nutrition Service] DB đã có sẵn ${count} giống loài, bỏ qua bước khởi tạo.`,
        );
      }
    } catch (error) {
      console.error(
        '❌ Lỗi xảy ra trong quá trình tự động khởi tạo dữ liệu:',
        error,
      );
    }
  }

  async create(createBreedDto: CreateBreedDto): Promise<Breed> {
    const breed = this.breedRepository.create(createBreedDto);
    return await this.breedRepository.save(breed);
  }

  async findAll(): Promise<Breed[]> {
    return await this.breedRepository.find();
  }

  async findOne(id: number): Promise<Breed> {
    const breed = await this.breedRepository.findOneBy({ id });
    if (!breed) throw new NotFoundException('Không tìm thấy giống loài này');
    return breed;
  }

  async remove(id: number): Promise<void> {
    const breed = await this.findOne(id);
    await this.breedRepository.remove(breed);
  }
}
