import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AtendimentoModel } from '@atendimento/domain/models';
import { IAtendimentoRepository } from '@atendimento/domain/repositories';

import { AtendimentoSchema } from '../schemas';

export class AtendimentoRepository implements IAtendimentoRepository {
  constructor(
    @InjectRepository(AtendimentoSchema)
    private readonly petRepository: Repository<AtendimentoModel>,
  ) {}

  async save(
    model: Omit<AtendimentoModel, 'dataInclusao'>,
  ): Promise<AtendimentoModel> {
    return await this.petRepository.save({
      ...model,
      dataInclusao: new Date().toISOString(),
    });
  }
}
