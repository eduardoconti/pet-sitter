import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IdempotencyRepository } from './idempotency.repository';
import { IdempotencySchema } from './idempotency.schema';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([IdempotencySchema])],
  providers: [IdempotencyRepository],
  exports: [IdempotencyRepository],
})
export class IdempotencyModule {}
