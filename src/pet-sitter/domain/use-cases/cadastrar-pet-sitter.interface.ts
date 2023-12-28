import { IUseCase } from '@core/use-case.interface';

import { CreatePetSitterEntityProps } from '../entities';

export type CadastrarPetSitterUseCaseInput = CreatePetSitterEntityProps;
export type CadastrarPetSitterUseCaseOutput = CreatePetSitterEntityProps & {
  id: string;
};

export type ICadastrarPetSitterUseCase = IUseCase<
  CadastrarPetSitterUseCaseInput,
  CadastrarPetSitterUseCaseOutput
>;
