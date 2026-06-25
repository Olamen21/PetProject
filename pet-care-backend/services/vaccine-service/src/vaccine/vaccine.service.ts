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
      throw new NotFoundException('Vaccine category not found');
    }

    if (category.quantity <= 0) {
      throw new BadRequestException(
        `Vaccine "${category.name}" is out of stock!`,
      );
    }

    const existingSchedule = await this.vaccineRepository.findOne({
      where: {
        pet_id: createVaccineDto.pet_id,
        vaccine_id: createVaccineDto.vaccine_id,
        status: In([VaccinationStatus.PENDING, VaccinationStatus.COMPLETED]),
      },
    });

    if (existingSchedule) {
      throw new BadRequestException(
        `Your pet already has a scheduled vaccination for "${category.name}" on ${existingSchedule.scheduled_date.toISOString().split('T')[0]}. Please complete or cancel it before creating a new one.`,
      );
    }

    if (createVaccineDto.dose_type === DoseType.PRIMARY) {
      if (createVaccineDto.dose_number > category.max_doses) {
        throw new BadRequestException(
          `This vaccine has a maximum of ${category.max_doses} primary doses!`,
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
            `You must complete dose number ${createVaccineDto.dose_number - 1} first!`,
          );
        }
      }
    }

    if (createVaccineDto.dose_type === DoseType.BOOSTER) {
      if (createVaccineDto.dose_number !== 1) {
        throw new BadRequestException(
          'Annual booster must always be dose number 1!',
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
          `Your pet has not completed the full ${category.max_doses} primary doses of this vaccine, so the annual booster cannot be administered yet!`,
        );
      }
    }

    if (createVaccineDto.dose_number > category.max_doses) {
      throw new BadRequestException(
        `Vaccine "${category.name}" only has a maximum of ${category.max_doses} primary doses. You cannot select dose number ${createVaccineDto.dose_number}!`,
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
    if (!record) throw new BadRequestException('Vaccination record not found');
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
        'This vaccination record has already been marked as completed!',
      );
    }
    await this.vaccineRepository.update(id, {
      status: VaccinationStatus.COMPLETED,
      administered_date: new Date(),
    });

    return this.findOne(id);
  }

  async suggestNextSchedule(
    petId: number,
    vaccineId: number,
  ): Promise<Date | null> {
    const category = await this.categoryRepository.findOne({
      where: { id: vaccineId },
    });
    if (!category) {
      throw new NotFoundException('Vaccine category not found');
    }

    const lastDose = await this.vaccineRepository.findOne({
      where: { pet_id: petId, vaccine_id: vaccineId },
      order: { scheduled_date: 'DESC' },
    });

    if (!lastDose) {
      return null;
    }

    const lastDate = new Date(lastDose.scheduled_date);

    if (category.max_doses > 1) {
      const nextDate = new Date(lastDate);
      nextDate.setDate(nextDate.getDate() + 21);
      return nextDate;
    } else {
      const nextDate = new Date(lastDate);
      nextDate.setFullYear(nextDate.getFullYear() + 1);
      return nextDate;
    }
  }
}
