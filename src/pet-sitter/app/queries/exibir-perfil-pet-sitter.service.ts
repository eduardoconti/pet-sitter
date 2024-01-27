import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PetSitterModel } from '@pet-sitter/domain/models';
import { PetSitterSchema } from '@pet-sitter/infra/schemas';
import { TipoServicoEnum } from '@servico/domain/enums';
import { StatusUsuario } from '@usuario/domain/enums';
import { Repository } from 'typeorm';
import { AvaliacoesPetSitterService } from './avaliacoes-pet-sitter.service';

export interface IExibirPerfilPetSitterResponse {
  id: number;
  nome: string;
  dataNascimento: Date;
  servicos: TipoServicoEnum[];
  localAtendimento: { cidade: string }[];
  membroDesde: Date;
  avaliacoes: { quantidadeAvaliacoes: number; rating: number };
}
@Injectable()
export class ExibirPerfilPetSitterService {
  constructor(
    @InjectRepository(PetSitterSchema)
    private readonly repository: Repository<PetSitterModel>,
    @Inject(AvaliacoesPetSitterService)
    private readonly avaliacoesService: AvaliacoesPetSitterService,
  ) {}

  async find(idPetSitter: number): Promise<IExibirPerfilPetSitterResponse> {
    const petSitterModel = await this.repository.find({
      where: {
        id: idPetSitter,
        usuario: {
          status: StatusUsuario.ATIVO,
        },
      },
      relations: {
        usuario: true,
        servicos: true,
        localAtendimento: {
          cidade: {
            estado: true,
          },
        },
        avaliacoes: {
          tutor: { usuario: true },
        },
      },
      select: {
        id: true,
        dataInclusao: true,
        localAtendimento: {
          idCidade: true,
          cidade: {
            nome: true,
            idEstado: true,
            estado: {
              nome: true,
            },
          },
        },
        servicos: {
          tipoServico: true,
        },
        usuario: {
          id: true,
          dataNascimento: true,
          email: true,
          nome: true,
          sobreNome: true,
        },
      },
    });

    if (!petSitterModel || !petSitterModel.length) {
      throw new NotFoundException('Pet sitter nao encontrado');
    }

    const petSitter = petSitterModel[0];

    if (!petSitter.servicos?.length || !petSitter.localAtendimento?.length) {
      throw new InternalServerErrorException();
    }

    const avaliacoes = await this.avaliacoesService.resumo({ id: idPetSitter });

    const resultado: IExibirPerfilPetSitterResponse = {
      id: petSitter.id,
      nome: `${petSitter.usuario.nome} ${petSitter.usuario.sobreNome}`,
      dataNascimento: new Date(petSitter.usuario.dataNascimento),
      membroDesde: new Date(petSitter.dataInclusao),
      servicos: petSitter.servicos.map((e) => e.tipoServico),
      localAtendimento: petSitter.localAtendimento.map((e) => {
        return {
          cidade: `${e.cidade?.nome}, ${e.cidade?.estado?.nome}`,
        };
      }),
      avaliacoes,
    };

    return resultado;
  }
}
