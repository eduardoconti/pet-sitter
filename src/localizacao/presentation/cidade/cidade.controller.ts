import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CidadeModel } from '@localizacao/domain/models';
import { CidadeSchema } from '@localizacao/infra/schemas/cidade.schema';

@ApiTags('localizacao')
@Controller('localizacao')
export class CidadeController {
  constructor(
    @InjectRepository(CidadeSchema)
    private readonly cidadeRepository: Repository<CidadeModel>,
  ) {}

  @Get('cidade/:idEstado')
  async listagemCidades(
    @Param('idEstado') idEstado: number,
  ): Promise<Pick<CidadeModel, 'id' | 'nome'>[]> {
    const cidades = await this.cidadeRepository.find({
      where: {
        idEstado,
      },
      select: {
        id: true,
        nome: true,
      },
    });

    return cidades;
  }
}
