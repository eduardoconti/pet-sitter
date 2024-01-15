import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    const [[localAtendimento], petSitterModel] = await Promise.all([
      this.localAtendimentoRepository.find({
        where: {
          idCidade: 1,
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
        },
      }),
      this.repository.find({
        where: {
          localAtendimento: {
            idCidade: idCidade,
          },
        },
        relations: {
          usuario: true,
        },
        select: {
          id: true,
          idUsuario: true,
          usuario: {
            email: true,
            nome: true,
            dataNascimento: true,
          },
        },
      }),
    ]);

    return {
      localAtendimento: {
        id: localAtendimento.id,
        cidade: localAtendimento.cidade?.nome,
        estado: localAtendimento.cidade?.estado?.nome,
      },
      petSitters: petSitterModel.map(
        ({ id, idUsuario, usuario: { nome, email, dataNascimento } }) => {
          return {
            id: id,
            idUsuario: idUsuario,
            nome: nome,
            email,
            dataNascimento,
          };
        },
      ),
    };
  }
}
