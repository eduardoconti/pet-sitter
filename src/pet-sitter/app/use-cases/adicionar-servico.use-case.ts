import {
  IPetSitterRepository,
  IServicoRepository,
} from '@pet-sitter/domain/repositories';

import { IUseCase } from '@core/use-case.interface';

import { TipoServicoEnum } from '@servico/domain/enums';

type AdicionarServicoUseCaseInput = {
  idUsuario: string;
  tipoServico: TipoServicoEnum;
};

export class AdicionarServicoUseCase
  implements IUseCase<AdicionarServicoUseCaseInput, any>
{
  constructor(
    private readonly petSitterRepository: IPetSitterRepository,
    private readonly servicoRepository: IServicoRepository,
  ) {}

  async executar({
    idUsuario,
    tipoServico,
  }: AdicionarServicoUseCaseInput): Promise<any> {
    const petSitterModel = await this.petSitterRepository.get(idUsuario);
    await this.servicoRepository.save({
      idPetSitter: petSitterModel.id,
      tipoServico,
    });
  }
}
