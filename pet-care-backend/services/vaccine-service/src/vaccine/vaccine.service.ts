import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PetVaccination } from './entities/vaccine.entity';
import { Repository, In } from 'typeorm';
import { DoseType, VaccinationStatus } from './constants/enums';
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
    const category = await this.categoryRepository.findOne({
      where: { id: createVaccineDto.vaccine_id },
    });
    if (!category) {
      throw new NotFoundException('Không tìm thấy loại vaccine này');
    }

    if (category.quantity <= 0) {
      throw new BadRequestException(
        `Vaccine "${category.name}" trong kho đã hết!`,
      );
    }
    if (createVaccineDto.dose_type === DoseType.PRIMARY) {
      if (createVaccineDto.dose_number > category.max_doses) {
        throw new BadRequestException(
          `Vaccine này chỉ có tối đa ${category.max_doses} mũi chính!`,
        );
      }

      if (createVaccineDto.dose_number > 1) {
        const previousDose = await this.vaccineRepository.findOne({
          where: {
            pet_id: createVaccineDto.pet_id,
            vaccine_id: createVaccineDto.vaccine_id,
            dose_number: createVaccineDto.dose_number - 1,
            dose_type: DoseType.PRIMARY,
          },
        });

        if (
          !previousDose ||
          previousDose.status === VaccinationStatus.CANCELLED
        ) {
          throw new BadRequestException(
            `Bạn phải hoàn thành mũi số ${createVaccineDto.dose_number - 1} trước!`,
          );
        }
      }
    }

    if (createVaccineDto.dose_type === DoseType.BOOSTER) {
      if (createVaccineDto.dose_number !== 1) {
        throw new BadRequestException(
          'Mũi nhắc lại hàng năm bắt buộc phải là mũi số 1!',
        );
      }

      const finalPrimaryDose = await this.vaccineRepository.findOne({
        where: {
          pet_id: createVaccineDto.pet_id,
          vaccine_id: createVaccineDto.vaccine_id,
          dose_number: category.max_doses,
          dose_type: DoseType.PRIMARY,
          status: VaccinationStatus.COMPLETED,
        },
      });

      if (!finalPrimaryDose) {
        throw new BadRequestException(
          `Bé pet chưa hoàn thành đủ phác đồ ${category.max_doses} mũi cơ bản của loại vaccine này, chưa thể tiêm mũi nhắc lại hàng năm!`,
        );
      }
    }
    if (createVaccineDto.dose_number > category.max_doses) {
      throw new BadRequestException(
        `Vaccine "${category.name}" chỉ có tối đa ${category.max_doses} mũi chính. Bạn không thể chọn mũi số ${createVaccineDto.dose_number}!`,
      );
    }

    await this.categoryRepository.update(category.id, {
      quantity: category.quantity - 1,
    });
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
    const record = await this.findOne(id);
    if (status === VaccinationStatus.COMPLETED) {
      return this.markComplete(id);
    }
    if (
      record.status === VaccinationStatus.PENDING &&
      (status === VaccinationStatus.CANCELLED ||
        status === VaccinationStatus.OVERDUE)
    ) {
      const category = record.vaccine;

      if (category) {
        await this.categoryRepository.update(category.id, {
          quantity: category.quantity + 1,
        });
      }
    }

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

    await this.vaccineRepository.update(id, {
      status: VaccinationStatus.COMPLETED,
      administered_date: new Date(),
    });

    return this.findOne(id);
  }
}
