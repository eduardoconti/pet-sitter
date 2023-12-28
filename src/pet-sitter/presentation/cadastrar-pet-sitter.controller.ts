import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CadastrarPetSitterUseCase } from '@pet-sitter/app/use-cases';
import { ICadastrarPetSitterUseCase } from '@pet-sitter/domain/use-cases';

import { CadastrarPetSitterDto } from './cadastrar-pet-sitter.dto';

@Controller('pet-sitter')
export class CadastrarPetSitterController {
  constructor(
    @Inject(CadastrarPetSitterUseCase)
    private readonly cadastrarPetSitterUseCase: ICadastrarPetSitterUseCase,
  ) {}

  @Post()
  async handle(@Body() dto: CadastrarPetSitterDto) {
    const useCaseOutput = await this.cadastrarPetSitterUseCase.executar(dto);
    return useCaseOutput;
  }
}
