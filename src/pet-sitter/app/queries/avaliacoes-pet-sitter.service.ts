import { QueryService } from '@core/querie.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AvaliacaoModel } from '@pet-sitter/domain/models/avaliacao.model';
import { AvaliacaoSchema } from '@pet-sitter/infra/schemas/avaliacao.schema';

import { IFindPaginado } from '@presentation/paginacao';
import { Repository } from 'typeorm';

export interface IAvaliacoesPetSitterServiceResponse {
  tutor: string;
  rating: number;
  data: Date;
  descricao?: string;
}
@Injectable()
export class AvaliacoesPetSitterService extends QueryService {
  constructor(
    @InjectRepository(AvaliacaoSchema)
    private readonly repository: Repository<AvaliacaoModel>,
  ) {
    super();
  }

  async find({
    idPetSitter,
    numeroPagina,
  }: {
    numeroPagina: number;
    idPetSitter: number;
  }): Promise<IFindPaginado<IAvaliacoesPetSitterServiceResponse>> {
    const totalLinhas = await this.repository.count({ where: { idPetSitter } });

    if (!totalLinhas) {
      return {
        totalLinhas,
        numeroPagina,
        tamanhoPagina: this.tamanhoPagina,
        quantidadePaginas: 0,
        data: [],
      };
    }

    const resultado = await this.repository.find({
      where: { idPetSitter },
      select: {
        id: true,
        idTutor: true,
        descricao: true,
        rating: true,
        dataInclusao: true,
        tutor: {
          id: true,
          usuario: {
            id: true,
            nome: true,
            sobreNome: true,
          },
        },
      },
      relations: {
        tutor: {
          usuario: true,
        },
      },
      order: {
        dataInclusao: 'DESC',
      },
      take: this.tamanhoPagina,
      skip: this.calcularSkip({ numeroPagina }),
    });

    return {
      totalLinhas,
      numeroPagina,
      tamanhoPagina: this.tamanhoPagina,
      quantidadePaginas: this.quantidadePaginas({
        totalLinhas,
      }),
      data: resultado.map((e) => {
        return {
          data: new Date(e.dataInclusao),
          descricao: e.descricao,
          rating: Number(e.rating),
          tutor: `${e.tutor?.usuario.nome} ${e.tutor?.usuario.sobreNome}`,
        };
      }),
    };
  }

  async resumo({
    id,
  }: {
    id: number;
  }): Promise<{ quantidadeAvaliacoes: number; rating: number }> {
    const [{ quantidadeAvaliacoes, rating }]: [
      { quantidadeAvaliacoes: number; rating: number },
    ] = await this.repository.query(`
      select count(tpsa.id) as "quantidadeAvaliacoes",
      round(avg(tpsa.rating),2) as "rating"
      from
        tb_pet_sitter_avaliacao tpsa
      where
        tpsa.id_pet_sitter = ${id}`);
    return {
      quantidadeAvaliacoes: Number(quantidadeAvaliacoes),
      rating: Number(rating),
    };
  }
}
