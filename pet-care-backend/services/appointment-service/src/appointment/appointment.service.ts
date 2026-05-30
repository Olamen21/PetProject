import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';

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
}
