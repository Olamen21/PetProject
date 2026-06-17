import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { AppointmentStatus } from './constants/enums';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  create(createAppointmentDto: CreateAppointmentDto, ownerId: number) {
    const appointment = this.appointmentRepository.create({
      ...createAppointmentDto,
      user_id: ownerId,
    });
    return this.appointmentRepository.save(appointment);
  }

  async findAll(): Promise<Appointment[]> {
    return await this.appointmentRepository.find();
  }

  findOne(id: number) {
    return this.appointmentRepository.findOne({ where: { id } });
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentRepository.update(id, updateAppointmentDto);
  }

  remove(id: number) {
    return this.appointmentRepository.delete(id);
  }

  async findByVetId(userId: number): Promise<Appointment[]> {
    return await this.appointmentRepository.find({ where: { vet_id: userId } });
  }

  async confirmAppointment(id: number) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
    });
    if (!appointment) {
      throw new Error('Appointment not found');
    }
    if (appointment.status === AppointmentStatus.CONFIRMED) {
      throw new Error('Appointment is already confirmed');
    }
    appointment.status = AppointmentStatus.CONFIRMED;
    return await this.appointmentRepository.save(appointment);
  }
  async completedAppointment(id: number) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
    });
    if (!appointment) {
      throw new Error('Appointment not found');
    }
    if (appointment.status === AppointmentStatus.COMPLETED) {
      throw new Error('Appointment is already completed');
    }
    appointment.status = AppointmentStatus.COMPLETED;
    return await this.appointmentRepository.save(appointment);
  }

  async cancelAppointment(id: number) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
    });
    if (!appointment) {
      throw new Error('Appointment not found');
    }
    if (appointment.status === AppointmentStatus.CANCELLED) {
      throw new Error('Appointment is already cancelled');
    }
    appointment.status = AppointmentStatus.CANCELLED;
    return await this.appointmentRepository.save(appointment);
  }

  async findByPetId(petId: number): Promise<Appointment[]> {
    return await this.appointmentRepository.find({ where: { pet_id: petId } });
  }
  async findByUserId(userId: number): Promise<Appointment[]> {
    return await this.appointmentRepository.find({
      where: { user_id: userId },
    });
  }
  async markCompleteReview(id: number) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
    });
    if (!appointment) {
      throw new Error('Appointment not found');
    }
    if (appointment.is_reviewed == true) {
      throw new Error('Review appointment is already completed');
    }
    appointment.is_reviewed = true;
    return await this.appointmentRepository.save(appointment);
  }
}
