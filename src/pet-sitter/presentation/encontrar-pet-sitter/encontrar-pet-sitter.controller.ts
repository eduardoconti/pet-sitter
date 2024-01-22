import { Controller, Get, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IFindPaginado } from '@presentation/paginacao';
import { FindOptionsWhere, In, Repository } from 'typeorm';

import {
  LocalAtendimentoModel,
  PetSitterModel,
} from '@pet-sitter/domain/models';
import {
  LocalAtendimentoSchema,
  PetSitterSchema,
} from '@pet-sitter/infra/schemas';

import { StatusUsuario } from '@usuario/domain/enums';

import { EncontrarPetSitterResponseDto } from './';

@Controller('pet-sitter')
export class EncontrarPetSitterController {
  constructor(
    @InjectRepository(PetSitterSchema)
    private readonly repository: Repository<PetSitterModel>,
    @InjectRepository(LocalAtendimentoSchema)
    private readonly localAtendimentoRepository: Repository<LocalAtendimentoModel>,
  ) {}

  @Get('encontrar')
  async encontrarPetSitterPorCidade(
    @Query('idCidade')
    idCidadeStr: string,
    @Query('idEstado')
    idEstadoStr: string,
    @Query('numeroPagina')
    numeroPaginaStr: string,
    @Query('servicos')
    servicos?: string,
  ): Promise<IFindPaginado<EncontrarPetSitterResponseDto>> {
    const tamanhoPagina = 20;
    const idEstado = Number(idEstadoStr);
    const numeroPagina = Number(numeroPaginaStr);
    const wherePetSitter: FindOptionsWhere<PetSitterModel> = {
      usuario: { status: StatusUsuario.ATIVO },
    };
    const where: FindOptionsWhere<LocalAtendimentoModel> = {
      cidade: {
        idEstado,
      },
    };

    if (idCidadeStr) {
      const cidades = idCidadeStr.split(',');
      where.idCidade = In(cidades);
    }

    if (servicos) {
      const tipos = servicos.split(',');
      wherePetSitter.servicos = { tipoServico: In(tipos) };
    }

    where.petSitter = wherePetSitter;

    const localAtendimento = await this.localAtendimentoRepository.find({
      where,
      select: {
        idPetSitter: true,
      },
    });

    const idsPetSitter = [
      ...new Set(localAtendimento.map((e) => e.idPetSitter)),
    ];

    const totalLinhas = await this.repository.count({
      where: {
        id: In(idsPetSitter),
      },
    });

    const petSitterModel: EncontrarPetSitterResponseDto[] =
      await this.repository.query(
        `SELECT
    tps.id,
       CONCAT(tu.nome, ' ', tu.sobrenome) as nome,
       tu.data_inclusao as "membroDesde",
       JSONB_AGG(ts.tipo_servico ORDER BY ts.tipo_servico) as "servicos"
    FROM
      tb_pet_sitter tps
    LEFT JOIN tb_usuario tu on
      tu.id = tps.id_usuario
    LEFT JOIN tb_servico ts on
      ts.id_pet_sitter = tps.id
    WHERE
      tps.id IN(${idsPetSitter.toString()})
      GROUP BY tps.id, tu.nome, tu.sobrenome, tu.data_inclusao
    ORDER BY tu.data_inclusao
    LIMIT $1
    OFFSET $2`,
        [tamanhoPagina, this.calcularSkip({ numeroPagina, tamanhoPagina })],
      );

    return {
      totalLinhas,
      numeroPagina,
      tamanhoPagina,
      data: petSitterModel,
    };
  }

  private calcularSkip({
    numeroPagina,
    tamanhoPagina,
  }: {
    numeroPagina: number;
    tamanhoPagina: number;
  }): number {
    return (numeroPagina - 1) * tamanhoPagina;
  }
}
