import {
  ILocalAtendimentoRepository,
  IPetSitterRepository,
} from '@pet-sitter/domain/repositories';

import { IUseCase } from '@core/use-case.interface';

type AdicionarLocalAtendimentoUseCaseInput = {
  idCidade: number;
  idUsuario: string;
  idRegiao?: number;
};

export class AdicionarLocalAtendimentoUseCase
  implements IUseCase<AdicionarLocalAtendimentoUseCaseInput, any>
{
  constructor(
    private readonly petSitterRepository: IPetSitterRepository,
    private readonly localAtendimentoRepository: ILocalAtendimentoRepository,
  ) {}

  async executar({
    idCidade,
    idUsuario,
    idRegiao,
  }: AdicionarLocalAtendimentoUseCaseInput): Promise<any> {
    const petSitterModel = await this.petSitterRepository.get(idUsuario);
    await this.localAtendimentoRepository.save({
      idPetSitter: petSitterModel.id,
      idCidade,
      idRegiao: idRegiao ?? null,
    });
  }
}
