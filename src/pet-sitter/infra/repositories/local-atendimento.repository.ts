import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LocalAtendimentoModel } from '@pet-sitter/domain/models';
import { ILocalAtendimentoRepository } from '@pet-sitter/domain/repositories';

import { LocalAtendimentoSchema } from '../schemas/local-atendimento.schema';

export class LocalAtendimentoRepository implements ILocalAtendimentoRepository {
  constructor(
    @InjectRepository(LocalAtendimentoSchema)
    private readonly petRepository: Repository<LocalAtendimentoModel>,
  ) {}

  async save(
    model: Omit<LocalAtendimentoModel, 'dataInclusao'>,
  ): Promise<LocalAtendimentoModel> {
    return await this.petRepository.save({
      ...model,
      dataInclusao: new Date().toISOString(),
    });
  }
}
