import { Injectable } from '@nestjs/common';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { Repository } from 'typeorm';
import { MedicalExamination } from './entities/medical_examinations.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Prescription } from './entities/prescriptions.entity';

@Injectable()
export class MedicalRecordService {
  constructor(
    @InjectRepository(MedicalExamination)
    private readonly medicalExaminationRepository: Repository<MedicalExamination>,
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: Repository<Prescription>,
  ) {}

  async create(createMedicalRecordDto: CreateMedicalRecordDto, vetId: number) {
    const { medications, ...recordData } = createMedicalRecordDto;

    const mappedPrescriptions = medications.map((med) => ({
      ...med,
      pet_id: recordData.pet_id,
    }));

    const medicalExamination = this.medicalExaminationRepository.create({
      ...recordData,
      vet_id: vetId,
      prescriptions: mappedPrescriptions,
    });

    return this.medicalExaminationRepository.save(medicalExamination);
  }

  async findAll() {
    return this.medicalExaminationRepository.find();
  }

  async findOne(id: number) {
    return this.medicalExaminationRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    return `This action removes a #${id} medicalRecord`;
  }
  async findCurrentMedications(petId: number) {
    const now = new Date();

    const prescriptions = await this.prescriptionRepository
      .createQueryBuilder('prescription')
      .innerJoinAndSelect('prescription.examination', 'examination')
      .where('prescription.pet_id = :petId', { petId })
      .orderBy('examination.created_at', 'DESC')
      .getMany();

    return prescriptions.map((item) => {
      const examDate = new Date(item.examination.created_at);

      const expirationDate = new Date(examDate);
      expirationDate.setDate(examDate.getDate() + item.duration);

      const isActive = now >= examDate && now <= expirationDate;

      return {
        id: item.id,
        medication_name: item.medication_name,
        dosage: item.dosage,
        duration: item.duration,
        note: item.note,
        start_date: examDate,
        end_date: expirationDate,
        status: isActive ? 'Active' : 'Expired',
      };
    });
  }
}
