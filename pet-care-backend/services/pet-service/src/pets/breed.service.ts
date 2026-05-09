import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Breed } from './entities/breed.entity';
import { CreateBreedDto } from './dto/create-breed.dto';

@Injectable()
export class BreedService {
  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  async create(createBreedDto: CreateBreedDto): Promise<Breed> {
    const breed = this.breedRepository.create(createBreedDto);
    return await this.breedRepository.save(breed);
  }

  async findAll(): Promise<Breed[]> {
    return await this.breedRepository.find();
  }

  async findOne(id: number): Promise<Breed> {
    const breed = await this.breedRepository.findOneBy({ id });
    if (!breed) throw new NotFoundException('Không tìm thấy giống loài này');
    return breed;
  }

  async remove(id: number): Promise<void> {
    const breed = await this.findOne(id);
    await this.breedRepository.remove(breed);
  }
}
