import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import {
  LocalAtendimentoModel,
  PetSitterModel,
} from '@pet-sitter/domain/models';
import {
  LocalAtendimentoSchema,
  PetSitterSchema,
} from '@pet-sitter/infra/schemas';

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
    idCidade: number,
    @Query('idEstado')
    idEstado: number,
  ) {
    const localAtendimento = await this.localAtendimentoRepository.find({
      where: {
        idCidade: idCidade,
        cidade: {
          idEstado,
        },
      },
      relations: {
        cidade: { estado: true },
      },
      select: {
        id: true,
        idCidade: true,
        cidade: {
          nome: true,
          estado: {
            nome: true,
          },
        },
        idPetSitter: true,
      },
    });

    if (!localAtendimento || !localAtendimento.length) {
      throw new NotFoundException('Nenhum Pet Sitter atende nessa regiao');
    }

    const idsPetSitter = localAtendimento.map((e) => e.idPetSitter);

    const petSitterModel = await this.repository.find({
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
      },
      order: {
        dataInclusao: 'ASC',
      },
    });

    return petSitterModel.map(
      ({ id, usuario: { nome, dataInclusao }, servicos }) => {
        return {
          id: id,
          nome: nome,
          membroDesde: dataInclusao,
          servicos: servicos?.map((e) => e.tipoServico),
        };
      },
    );
  }
}
