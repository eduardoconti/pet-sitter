import { IUseCase } from '@core/use-case.interface';

import { CreatePetSitterEntityProps } from '../entities';

export type PreCadastroPetSitterUseCaseInput = Omit<
  CreatePetSitterEntityProps,
  'idPetSitter' | 'status'
>;
export type PreCadastroPetSitterUseCaseOutput = Omit<
  CreatePetSitterEntityProps,
  'senha' | 'idPetSitter' | 'status'
> & {
  id: string;
};

export type IPreCadastroPetSitterUseCase = IUseCase<
  PreCadastroPetSitterUseCaseInput,
  PreCadastroPetSitterUseCaseOutput
>;
