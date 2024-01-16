import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
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
  @Get('encontrar/cidade/:idCidade')
  async encontrarPetSitterPorCidade(
    @Param(
      'idCidade',
      new ParseIntPipe({
        exceptionFactory: () => {
          throw new BadRequestException('Id cidade deve ser numerico');
        },
      }),
    )
    idCidade: number,
  ) {
    const localAtendimento = await this.localAtendimentoRepository.find({
      where: {
        idCidade: idCidade,
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
        servicoAlimentacao: true,
        servicoHospedagem: true,
        servicoPasseio: true,
      },
      select: {
        id: true,
        usuario: {
          nome: true,
          dataInclusao: true,
        },
        servicoAlimentacao: {
          tipoServico: true,
        },
        servicoPasseio: {
          tipoServico: true,
        },
        servicoHospedagem: {
          tipoServico: true,
        },
      },
      order: {
        dataInclusao: 'ASC',
      },
    });

    return {
      localAtendimento: {
        cidade: localAtendimento[0].cidade?.nome,
        estado: localAtendimento[0].cidade?.estado?.nome,
      },
      petSitters: petSitterModel.map(
        ({
          id,
          usuario: { nome, dataInclusao },
          servicoAlimentacao,
          servicoHospedagem,
          servicoPasseio,
        }) => {
          const servicos = [];

          if (servicoAlimentacao) {
            servicos.push(servicoAlimentacao.tipoServico);
          }
          if (servicoHospedagem) {
            servicos.push(servicoHospedagem.tipoServico);
          }
          if (servicoPasseio) {
            servicos.push(servicoPasseio.tipoServico);
          }

          return {
            id: id,
            nome: nome,
            membroDesde: dataInclusao,
            servicos,
          };
        },
      ),
    };
  }
}
