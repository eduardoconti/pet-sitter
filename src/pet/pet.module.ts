import { Module } from '@nestjs/common';
import { PetController } from './presentation/pet.controller';

@Module({
  controllers: [PetController],
})
export class PetModule {}
