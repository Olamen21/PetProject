import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) {}

  async create(data: Partial<Pet>): Promise<Pet> {
    const newPet = this.petRepository.create(data);
    return await this.petRepository.save(newPet);
  }

  async findAll(): Promise<Pet[]> {
    return await this.petRepository.find();
  }

  async findByOwner(ownerId: number): Promise<Pet[]> {
    return await this.petRepository.find({ where: { owner_id: ownerId } });
  }

  async findOne(id: number): Promise<Pet> {
    const pet = await this.petRepository.findOne({ where: { id } });
    if (!pet) throw new NotFoundException(`Pet with ID ${id} not found`);
    return pet;
  }

  async update(id: number, data: Partial<Pet>): Promise<Pet> {
    await this.findOne(id);
    await this.petRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const pet = await this.findOne(id);
    await this.petRepository.remove(pet);
  }
}
