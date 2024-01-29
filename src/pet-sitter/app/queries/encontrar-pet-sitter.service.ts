import { Injectable } from '@nestjs/common';
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

import { QueryService } from '@core/querie.service';

import { StatusUsuario } from '@usuario/domain/enums';

import { TipoServicoEnum } from '@servico/domain/enums';

export interface IEncontrarPetSitterResponse {
  id: number;
  nome: string;
  dataNascimento: Date;
  membroDesde: Date;
  servicos: TipoServicoEnum[];
  localAtendimento: { cidade: string }[];
}
@Injectable()
export class EncontrarPetSitterService extends QueryService {
  constructor(
    @InjectRepository(PetSitterSchema)
    private readonly repository: Repository<PetSitterModel>,
    @InjectRepository(LocalAtendimentoSchema)
    private readonly localAtendimentoRepository: Repository<LocalAtendimentoModel>,
  ) {
    super();
  }

  async find(
    idEstado: number,
    numeroPagina: number,
    idCidades?: number[],
    servicos?: TipoServicoEnum[],
  ): Promise<IFindPaginado<IEncontrarPetSitterResponse>> {
    const wherePetSitter: FindOptionsWhere<PetSitterModel> = {
      usuario: { status: StatusUsuario.ATIVO },
    };
    const where: FindOptionsWhere<LocalAtendimentoModel> = {
      cidade: {
        idEstado,
      },
    };

    if (idCidades) {
      where.idCidade = In(idCidades);
    }

    if (servicos) {
      wherePetSitter.servicos = { tipoServico: In(servicos) };
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

    const totalLinhas = idsPetSitter.length;

    if (!totalLinhas) {
      return {
        totalLinhas,
        numeroPagina,
        tamanhoPagina: this.tamanhoPagina,
        quantidadePaginas: 0,
        data: [],
      };
    }
    const petSitterModel: IEncontrarPetSitterResponse[] =
      await this.repository.query(
        `SELECT
    tps.id,
       CONCAT(tu.nome, ' ', tu.sobrenome) as nome,
       tu.data_inclusao as "membroDesde",
       JSONB_AGG(ts.tipo_servico ORDER BY ts.tipo_servico) as "servicos",
       (
        SELECT JSONB_BUILD_OBJECT(
          'quantidadeAvaliacoes', COUNT(tpsa.id),
          'rating', ROUND(AVG(tpsa.rating),2)
        )
        FROM tb_pet_sitter_avaliacao tpsa
        WHERE tpsa.id_pet_sitter = tps.id
      ) as avaliacoes
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
        [this.tamanhoPagina, this.calcularSkip({ numeroPagina })],
      );

    return {
      totalLinhas,
      numeroPagina,
      tamanhoPagina: this.tamanhoPagina,
      quantidadePaginas: this.quantidadePaginas({
        totalLinhas,
      }),
      data: petSitterModel,
    };
  }
}
