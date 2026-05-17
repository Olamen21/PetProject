import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PetVaccination } from './entities/vaccine.entity';
import { Repository, In } from 'typeorm';
import { VaccinationStatus } from './constants/enums';
import { VaccineCategory } from './entities/vaccine-category.entity';
@Injectable()
export class VaccineService {
  constructor(
    @InjectRepository(PetVaccination)
    private readonly vaccineRepository: Repository<PetVaccination>,
    @InjectRepository(VaccineCategory)
    private readonly categoryRepository: Repository<VaccineCategory>,
  ) {}
  async create(createVaccineDto: CreateVaccineDto): Promise<PetVaccination> {
    const newVaccine = this.vaccineRepository.create({
      ...createVaccineDto,
      status: VaccinationStatus.PENDING,
    });
    return await this.vaccineRepository.save(newVaccine);
  }

  async findAll() {
    return await this.vaccineRepository.find({
      relations: ['vaccine'],
      order: { scheduled_date: 'DESC' },
    });
  }

  async findPetById(petId: number) {
    return await this.vaccineRepository.find({
      where: { pet_id: petId },
      relations: ['vaccine'],
      order: { scheduled_date: 'ASC' },
    });
  }

  async findByUser(petIds: number[]) {
    if (petIds.length === 0) return [];
    return await this.vaccineRepository.find({
      where: { pet_id: In(petIds) },
      relations: ['vaccine'],
      order: { scheduled_date: 'ASC' },
    });
  }

  async findOne(id: number) {
    const record = await this.vaccineRepository.findOne({
      where: { id },
      relations: ['vaccine'],
    });
    if (!record) throw new NotFoundException('Không tìm thấy lịch tiêm này');
    return record;
  }

  async remove(id: number) {
    const record = await this.findOne(id);
    return await this.vaccineRepository.remove(record);
  }

  async updateStatus(id: number, status: VaccinationStatus) {
    if (status === VaccinationStatus.COMPLETED) {
      return this.markComplete(id);
    }

    const record = await this.findOne(id);
    await this.vaccineRepository.update(id, { status });
    return this.findOne(id);
  }

  async checkOverdue() {
    const today = new Date();
    return await this.vaccineRepository
      .createQueryBuilder()
      .update(PetVaccination)
      .set({ status: VaccinationStatus.OVERDUE })
      .where('scheduled_date < :today', { today })
      .andWhere('status = :status', { status: VaccinationStatus.PENDING })
      .execute();
  }

  async markComplete(id: number) {
    const record = await this.findOne(id);

    if (record.status === VaccinationStatus.COMPLETED) {
      throw new BadRequestException(
        'Lịch tiêm này đã được xác nhận hoàn thành trước đó!',
      );
    }

    const category = record.vaccine;

    if (!category) {
      throw new NotFoundException(
        'Không tìm thấy thông tin danh mục của loại vaccine này',
      );
    }

    if (category.quantity <= 0) {
      throw new BadRequestException(
        `Vaccine "${category.name}" trong kho đã hết!`,
      );
    }

    await this.categoryRepository.update(category.id, {
      quantity: category.quantity - 1,
    });

    await this.vaccineRepository.update(id, {
      status: VaccinationStatus.COMPLETED,
      administered_date: new Date(),
    });

    return this.findOne(id);
  }
}
