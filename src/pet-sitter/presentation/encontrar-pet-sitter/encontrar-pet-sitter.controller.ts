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
    idEstado: number,
    @Query('servicos')
    servicos?: string,
  ): Promise<IFindPaginado<EncontrarPetSitterResponseDto>> {
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
    const [petSitterModel, total] = await this.repository.findAndCount({
      where: {
        id: In(idsPetSitter),
      },
      relations: {
        usuario: true,
        servicos: true,
      },
      select: {
        id: true,
        usuario: {
          nome: true,
          dataInclusao: true,
        },
        servicos: {
          tipoServico: true,
        },
      },
      order: {
        dataInclusao: 'ASC',
        servicos: {
          tipoServico: 'ASC',
        },
      },
    });

    return {
      totalLinhas: total,
      numeroPagina: 1,
      tamanhoPagina: 20,
      data: petSitterModel.map(
        ({ id, usuario: { nome, dataInclusao }, servicos }) => {
          return {
            id: id,
            nome: nome,
            membroDesde: dataInclusao as Date,
            servicos: servicos?.map((e) => e.tipoServico),
          };
        },
      ),
    };
  }
}
