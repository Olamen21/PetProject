import { Injectable, NotFoundException } from '@nestjs/common';
import { VaccineCategory } from './entities/vaccine-category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { VaccineCategoryDto } from './dto/create-vaccine-category.dto';

@Injectable()
export class VaccineCategoryService {
  constructor(
    @InjectRepository(VaccineCategory)
    private readonly vaccineCategoryRepository: Repository<VaccineCategory>,
  ) {}

  async create(
    createVaccineCategoryDto: VaccineCategoryDto,
  ): Promise<VaccineCategory> {
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
    if (!vaccineCategory)
      throw new NotFoundException('Không tìm thấy vaccine này');
    return vaccineCategory;
  }

  async remove(id: number): Promise<void> {
    const vaccineCategory = await this.findOne(id);
    await this.vaccineCategoryRepository.remove(vaccineCategory);
  }
}
