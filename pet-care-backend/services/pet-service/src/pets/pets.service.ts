import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { UpdatePetDto } from './dto/update-pet.dto';
import { CreatePetDto } from './dto/create-pet.dto';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) {}

  async create(
    createPetDto: CreatePetDto,
    ownerId: number,
    imageUrl?: string,
  ): Promise<Pet> {
    // const createData = { ...createPetDto };

    if (imageUrl) {
      createPetDto.avatar_url = imageUrl;
    }

    if (typeof createPetDto.neutered === 'string') {
      createPetDto.neutered = createPetDto.neutered === 'true';
    }

    const newPet = this.petRepository.create({
      ...createPetDto,
      owner_id: ownerId,
    });

    const savedPet = await this.petRepository.save(newPet);

    return savedPet;
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

  async findOne(id: number): Promise<Pet> {
    const pet = await this.petRepository.findOne({
      where: { id },
      relations: ['breed_relation'],
    });
    if (!pet) throw new NotFoundException('Không tìm thấy thú cưng này');
    return pet;
  }

  async update(
    petId: number,
    data: UpdatePetDto,
    imageUrl?: string,
  ): Promise<Pet> {
    // const pet = await this.findOne(petId);

    // const updateData: any = { ...data };

    if (imageUrl) {
      data.avatar_url = imageUrl;
    }

    if (typeof data.neutered === 'string') {
      data.neutered = data.neutered === 'true';
    }

    const updatedPet = await this.petRepository.preload({
      id: petId,
      ...data,
    });

    if (!updatedPet)
      throw new NotFoundException('Không tìm thấy thú cưng để cập nhật');

    return await this.petRepository.save(updatedPet);
  }

  async remove(petId: number): Promise<void> {
    const pet = await this.findOne(petId);
    await this.petRepository.remove(pet);
  }
}
