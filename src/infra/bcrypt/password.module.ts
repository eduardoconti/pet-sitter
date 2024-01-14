import { Module } from '@nestjs/common';

import { PasswordHash } from './hash';

@Module({
  providers: [PasswordHash],
  exports: [PasswordHash],
})
export class PasswordModule {}
