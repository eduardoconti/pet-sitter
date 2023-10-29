import { Module } from '@nestjs/common';
import { PetModule } from '@pet/pet.module';

@Module({
  imports: [PetModule],
})
export class MainModule {}
