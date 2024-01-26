import { Provider } from '@nestjs/common';

import { PreCadastroPetSitterUseCase } from '@pet-sitter/app/use-cases';
import { AdicionarLocalAtendimentoUseCase } from '@pet-sitter/app/use-cases';
import { AdicionarServicoUseCase } from '@pet-sitter/app/use-cases/adicionar-servico.use-case';
import {
  ILocalAtendimentoRepository,
  IPetSitterRepository,
  IServicoRepository,
} from '@pet-sitter/domain/repositories';
import {
  LocalAtendimentoRepository,
  PetSitterRepository,
  ServicoRepository,
} from '@pet-sitter/infra/repositories';

import { PasswordService } from '@infra/bcrypt';

import { IHash } from '@core/contracts';
import { AtivarCadastroMailerService } from '@usuario/infra/services';

export const CadastrarPetSitterUseCaseProvider: Provider = {
  provide: PreCadastroPetSitterUseCase,
  useFactory(
    repository: IPetSitterRepository,
    hash: IHash,
    mailerService: AtivarCadastroMailerService,
  ) {
    return new PreCadastroPetSitterUseCase(repository, hash, mailerService);
  },
  inject: [PetSitterRepository, PasswordService, AtivarCadastroMailerService],
};

export const AdicionarLocalAtendimentoUseCaseProvider: Provider = {
  provide: AdicionarLocalAtendimentoUseCase,
  useFactory(
    repository: IPetSitterRepository,
    localAtendimentoRepository: ILocalAtendimentoRepository,
  ) {
    return new AdicionarLocalAtendimentoUseCase(
      repository,
      localAtendimentoRepository,
    );
  },
  inject: [PetSitterRepository, LocalAtendimentoRepository],
};

export const AdicionarServicoUseCaseProvider: Provider = {
  provide: AdicionarServicoUseCase,
  useFactory(
    repository: IPetSitterRepository,
    localAtendimentoRepository: IServicoRepository,
  ) {
    return new AdicionarServicoUseCase(repository, localAtendimentoRepository);
  },
  inject: [PetSitterRepository, ServicoRepository],
};
