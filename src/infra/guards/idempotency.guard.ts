import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';

import { IdempotencyException } from '@infra/idempotency/idempotency.exception';
import { IdempotencyRepository } from '@infra/idempotency/idempotency.repository';

@Injectable()
export class IdempotencyGuard implements CanActivate {
  constructor(private readonly repo: IdempotencyRepository) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> | Promise<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const idempotencyKey = request.headers['x-idempotency-key'] as string;

    if (!idempotencyKey) {
      throw new BadRequestException('x-idempotency-key obrigatorio');
    }

    if (await this.repo.exist(idempotencyKey)) {
      throw new IdempotencyException();
    }

    await this.repo.save({ id: idempotencyKey });
    return true;
  }
}
