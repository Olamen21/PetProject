import {
  BadRequestException,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { VaccineCategory } from './entities/vaccine-category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { VaccineCategoryDto } from './dto/create-vaccine-category.dto';
import * as fs from 'fs';
import * as path from 'path';

interface Vaccine {
  name: string;
  target_species: string;
  quantity: number;
  max_doses: number;
}
@Injectable()
export class VaccineCategoryService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(VaccineCategory)
    private readonly vaccineCategoryRepository: Repository<VaccineCategory>,
  ) {}

  async onApplicationBootstrap() {
    try {
      const count = await this.vaccineCategoryRepository.count();

      if (count === 0) {
        console.log(
          ' [Vaccine Service] DB trống. Đang tự động nạp dữ liệu từ file JSON...',
        );

        const jsonPath = path.join(__dirname, 'data', 'vaccine.json');

        if (!fs.existsSync(jsonPath)) {
          console.warn(
            ` Không tìm thấy file JSON mẫu tại đường dẫn: ${jsonPath}`,
          );
          return;
        }

        const rawData = fs.readFileSync(jsonPath, 'utf-8');
        const foodsData = JSON.parse(rawData) as Vaccine[];

        const entities = foodsData.map((vaccine) => {
          return this.vaccineCategoryRepository.create({
            name: vaccine.name,
            quantity: vaccine.quantity,
            target_species: vaccine.target_species,
            max_doses: vaccine.max_doses,
          });
        });

        await this.vaccineCategoryRepository.save(entities);
        console.log(` Tự động khởi tạo thành công ${entities.length} vaccine!`);
      } else {
        console.log(
          `ℹ[Vaccine Service] DB đã có sẵn ${count} vaccine, bỏ qua bước khởi tạo.`,
        );
      }
    } catch (error) {
      console.error(
        ' Lỗi xảy ra trong quá trình tự động khởi tạo dữ liệu:',
        error,
      );
    }
  }

  async create(
    createVaccineCategoryDto: VaccineCategoryDto,
  ): Promise<VaccineCategory> {
    const existingCategory = await this.vaccineCategoryRepository.findOne({
      where: { name: createVaccineCategoryDto.name },
    });

    if (existingCategory) {
      throw new BadRequestException(
        'A vaccine category with this name already exists',
      );
    }

    const vaccineCategory = this.vaccineCategoryRepository.create(
      createVaccineCategoryDto,
    );
    return await this.vaccineCategoryRepository.save(vaccineCategory);
  }

  async findAll(): Promise<VaccineCategory[]> {
    return await this.vaccineCategoryRepository.find();
  }

  async findOne(id: number): Promise<VaccineCategory> {
    const vaccineCategory = await this.vaccineCategoryRepository.findOneBy({
      id,
    });
    if (!vaccineCategory) throw new BadRequestException('Vaccine not found.');
    return vaccineCategory;
  }

  async remove(id: number): Promise<void> {
    const vaccineCategory = await this.findOne(id);
    await this.vaccineCategoryRepository.remove(vaccineCategory);
  }

  async update(
    id: number,
    updateVaccineCategoryDto: VaccineCategoryDto,
  ): Promise<VaccineCategory> {
    const vaccineCategory = await this.findOne(id);
    Object.assign(vaccineCategory, updateVaccineCategoryDto);
    return await this.vaccineCategoryRepository.save(vaccineCategory);
  }
}
