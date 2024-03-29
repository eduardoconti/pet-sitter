import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PreCadastroPetSitterUseCase } from '@pet-sitter/app/use-cases';
import { IPreCadastroPetSitterUseCase } from '@pet-sitter/domain/use-cases';

import { PreCadastroPetSitterDto } from './pre-cadastro-pet-sitter.dto';
@ApiTags('pet-sitter')
@Controller('pet-sitter')
export class PreCadastroPetSitterController {
  constructor(
    @Inject(PreCadastroPetSitterUseCase)
    private readonly cadastrarPetSitterUseCase: IPreCadastroPetSitterUseCase,
  ) {}

  @Post('pre-cadastro')
  async handle(@Body() dto: PreCadastroPetSitterDto) {
    const useCaseOutput = await this.cadastrarPetSitterUseCase.executar(dto);
    return useCaseOutput;
  }
}
