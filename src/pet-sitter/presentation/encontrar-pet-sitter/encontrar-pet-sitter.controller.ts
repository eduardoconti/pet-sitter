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
    idCidade: string,
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

    const where: FindOptionsWhere<LocalAtendimentoModel> = {
      cidade: {
        idEstado,
      },
    };

    if (idCidade) {
      const cidades = idCidade.split(',');
      where.idCidade = In(cidades);
    }

    if (servicos) {
      const tipos = servicos.split(',');
      where.petSitter = {
        servicos: { tipoServico: In(tipos) },
      };
    }

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
        usuario: {
          status: StatusUsuario.ATIVO,
        },
      },
      relations: {
        usuario: true,
      },
    });

    const petSitterModel = await this.repository.find({
      where: {
        id: In(idsPetSitter),
        usuario: {
          status: StatusUsuario.ATIVO,
        },
      },
      relations: {
        usuario: true,
        servicos: true,
      },
      select: {
        id: true,
        usuario: {
          nome: true,
          sobreNome: true,
          dataInclusao: true,
        },
        servicos: {
          id: true,
          tipoServico: true,
        },
        dataInclusao: true,
      },
      order: {
        dataInclusao: 'ASC',
        servicos: {
          tipoServico: 'ASC',
        },
      },
      take: tamanhoPagina,
      skip: this.calcularSkip({ numeroPagina, tamanhoPagina }),
    });

    return {
      totalLinhas,
      numeroPagina,
      tamanhoPagina,
      data: petSitterModel.map(
        ({ id, usuario: { nome, dataInclusao, sobreNome }, servicos }) => {
          return {
            id: id,
            nome: `${nome} ${sobreNome}`,
            membroDesde: dataInclusao as Date,
            servicos: servicos?.map((e) => e.tipoServico),
          };
        },
      ),
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
