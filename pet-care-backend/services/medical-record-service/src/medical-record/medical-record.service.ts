import { Injectable } from '@nestjs/common';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { Repository } from 'typeorm';
import { MedicalExamination } from './entities/medical_examinations.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MedicalRecordService {
  constructor(
    @InjectRepository(MedicalExamination)
    private readonly medicalExaminationRepository: Repository<MedicalExamination>,
  ) {}

  async create(createMedicalRecordDto: CreateMedicalRecordDto, vetId: number) {
    const medicalExamination = this.medicalExaminationRepository.create({
      ...createMedicalRecordDto,
      vet_id: vetId,
    });
    return this.medicalExaminationRepository.save(medicalExamination);
  }

  async findAll() {
    return this.medicalExaminationRepository.find();
  }

  async findOne(id: number) {
    return this.medicalExaminationRepository.findOne({ where: { id } });
  }

  update(id: number, updateMedicalRecordDto: UpdateMedicalRecordDto) {
    return `This action updates a #${id} medicalRecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicalRecord`;
  }
}
