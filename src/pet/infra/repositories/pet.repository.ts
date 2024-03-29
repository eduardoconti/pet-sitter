import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PetModel } from '@pet/domain/models';
import { IPetRepository } from '@pet/domain/repositories';

import { PetSchema } from '../schemas/pet.schema';

export class PetRepository implements IPetRepository {
  constructor(
    @InjectRepository(PetSchema)
    private readonly petRepository: Repository<PetModel>,
  ) {}

  async save(model: Omit<PetModel, 'dataInclusao' | 'id'>): Promise<PetModel> {
    return await this.petRepository.save({
      ...model,
      dataInclusao: new Date().toISOString(),
    });
  }
}
