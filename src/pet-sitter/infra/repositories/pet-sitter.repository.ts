import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PetSitterModel } from '@pet-sitter/domain/models';
import { IPetSitterRepository } from '@pet-sitter/domain/repositories';

import { PetSitterSchema } from '../schemas';

export class PetSitterRepository implements IPetSitterRepository {
  constructor(
    @InjectRepository(PetSitterSchema)
    private readonly petRepository: Repository<PetSitterModel>,
  ) {}

  async save(
    model: Omit<PetSitterModel, 'dataInclusao'>,
  ): Promise<PetSitterModel> {
    return await this.petRepository.save({
      ...model,
      dataInclusao: new Date().toISOString(),
    });
  }
}
