import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EstadoModel } from '@localizacao/domain/models';
import { EstadoSchema } from '@localizacao/infra/schemas';

@ApiTags('localizacao')
@Controller('localizacao')
export class EstadoController {
  constructor(
    @InjectRepository(EstadoSchema)
    private readonly estadoRepository: Repository<EstadoModel>,
  ) {}

  @Get('estado/:idPais')
  async listagemEstados(
    @Param('idPais') idPais: number,
  ): Promise<Pick<EstadoModel, 'id' | 'nome'>[]> {
    const estados = await this.estadoRepository.find({
      where: {
        idPais,
      },
      select: {
        id: true,
        nome: true,
      },
    });

    return estados;
  }
}
