import { IUseCase } from '@core/use-case.interface';

import { CreatePetSitterEntityProps } from '../entities';

export type PreCadastroPetSitterUseCaseInput = Omit<
  CreatePetSitterEntityProps,
  'idPetSitter'
>;
export type PreCadastroPetSitterUseCaseOutput = Omit<
  CreatePetSitterEntityProps,
  'senha' | 'idPetSitter'
> & {
  id: string;
};

export type IPreCadastroPetSitterUseCase = IUseCase<
  PreCadastroPetSitterUseCaseInput,
  PreCadastroPetSitterUseCaseOutput
>;
