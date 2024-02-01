import { IUseCase } from '@core/use-case.interface';

import { CreatePetSitterEntityProps } from '../entities';

export type AtualizarCadastroPetSitterUseCaseInput = Partial<
  Omit<
    CreatePetSitterEntityProps,
    'idPetSitter' | 'status' | 'id' | 'email' | 'senha'
  >
> & { id: string; idPetSitter: number };

export type AtualizarCadastroPetSitterUseCaseOutput =
  AtualizarCadastroPetSitterUseCaseInput;

export type IAtualizarCadastroPetSitterUseCase = IUseCase<
  AtualizarCadastroPetSitterUseCaseInput,
  AtualizarCadastroPetSitterUseCaseOutput
>;
