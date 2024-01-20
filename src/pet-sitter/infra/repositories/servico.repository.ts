import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ServicoModel } from '@pet-sitter/domain/models';
import { IServicoRepository } from '@pet-sitter/domain/repositories';

import { ServicoSchema } from '@servico/infra/schemas';

export class ServicoRepository implements IServicoRepository {
  constructor(
    @InjectRepository(ServicoSchema)
    private readonly petRepository: Repository<ServicoModel>,
  ) {}

  async save(model: Omit<ServicoModel, 'dataInclusao'>): Promise<ServicoModel> {
    return await this.petRepository.save({
      ...model,
      dataInclusao: new Date().toISOString(),
    });
  }
}
