import { CreatePetDto } from './dto/create-pet.dto';
import { Injectable, NotFoundException, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) {}

  async create(createPetDto: CreatePetDto, ownerId: number): Promise<Pet> {
    const newPet = this.petRepository.create({
      ...createPetDto,
      owner_id: ownerId,
    });
    return await this.petRepository.save(newPet);
  }

  async findAllByOwner(ownerId: number): Promise<Pet[]> {
    return await this.petRepository.find({
      where: { owner_id: ownerId },
      order: { id: 'DESC' },
    });
  }

  async findAll(): Promise<Pet[]> {
    return await this.petRepository.find();
  }

  async findByOwner(ownerId: number): Promise<Pet[]> {
    return await this.petRepository.find({
      where: { owner_id: ownerId },
      order: { id: 'DESC' },
    });
  }

  async findOne(petId: number): Promise<Pet> {
    const pet = await this.petRepository.findOne({ where: { id: petId } });
    if (!pet) throw new NotFoundException(`Pet with ID ${petId} not found`);
    return pet;
  }

  async update(
    petId: number,
    data: Partial<Pet>,
    imageUrl?: string,
  ): Promise<Pet> {
    await this.findOne(petId);
    const updateData = { ...data };
    if (imageUrl) {
      updateData.image = imageUrl;
    }
    await this.petRepository.update(petId, data);
    return this.findOne(petId);
  }

  async remove(petId: number): Promise<void> {
    const pet = await this.findOne(petId);
    await this.petRepository.remove(pet);
  }
}
