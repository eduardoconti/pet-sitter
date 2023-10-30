import { InjectRepository } from '@nestjs/typeorm';
import { PetModel } from '@pet/domain/models';
import { IPetRepository } from '@pet/domain/repositories';
import { Repository } from 'typeorm';
import { PetSchema } from '../schemas/pet.schema';

export class PetRepository implements IPetRepository {
  constructor(
    @InjectRepository(PetSchema)
    private readonly petRepository: Repository<PetModel>,
  ) {}

  async save(model: Omit<PetModel, 'dataInclusao'>): Promise<PetModel> {
    return await this.petRepository.save({
      ...model,
      dataInclusao: new Date().toISOString(),
    });
  }
}
