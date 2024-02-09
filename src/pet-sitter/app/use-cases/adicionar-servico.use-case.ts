import { PetSitterEntityMapper } from '@pet-sitter/domain/mappers';
import {
  IPetSitterRepository,
  IServicoRepository,
} from '@pet-sitter/domain/repositories';
import {
  AdicionarServicoUseCaseInput,
  IAdicionarServicoUseCase,
} from '@pet-sitter/domain/use-cases';

import { ServicoEntityFactory } from '@servico/domain/factories';

export class AdicionarServicoUseCase implements IAdicionarServicoUseCase {
  constructor(
    private readonly petSitterRepository: IPetSitterRepository,
    private readonly servicoRepository: IServicoRepository,
  ) {}

  async executar({
    idUsuario,
    tipoServico,
  }: AdicionarServicoUseCaseInput): Promise<void> {
    const petSitterModel = await this.petSitterRepository.get(idUsuario);
    const petSitterEntity = PetSitterEntityMapper.toEntity(petSitterModel);
    const servicoEntity = ServicoEntityFactory.create({
      tipoServico,
      idPetSitter: petSitterModel.id,
    });

    petSitterEntity.adicionarServico(servicoEntity);

    await this.servicoRepository.save({
      idPetSitter: petSitterModel.id,
      tipoServico,
    });
  }
}
