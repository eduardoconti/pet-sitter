import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CadastrarPetUseCase } from '@pet/app/cadastrar-pet.use-case';
import { ICadastrarPetUseCase } from '@pet/domain/use-cases/cadastrar-pet.interface';
import { CadastrarPetDto } from './cadastrar-pet.dto';

@Controller('pet')
export class CadastrarPetController {
  constructor(
    @Inject(CadastrarPetUseCase)
    private readonly cadastrarPetUseCase: ICadastrarPetUseCase,
  ) {}

  @Post()
  async cadastrarPet(@Body() dto: CadastrarPetDto) {
    return await this.cadastrarPetUseCase.executar(dto);
  }
}
