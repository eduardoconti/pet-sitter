import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IdempotencyModel } from './idempotency.model';
import { IdempotencySchema } from './idempotency.schema';

@Injectable()
export class IdempotencyRepository {
  constructor(
    @InjectRepository(IdempotencySchema)
    private readonly idempotencyRepository: Repository<IdempotencyModel>,
  ) {}

  async save(
    model: Omit<IdempotencyModel, 'dataInclusao'>,
  ): Promise<IdempotencyModel> {
    return await this.idempotencyRepository.save({
      ...model,
      dataInclusao: new Date().toISOString(),
    });
  }

  async exist(id: string): Promise<boolean> {
    const idempotency = await this.idempotencyRepository.find({
      where: {
        id,
      },
    });

    if (!idempotency || !idempotency.length) {
      return false;
    }
    return true;
  }
}
