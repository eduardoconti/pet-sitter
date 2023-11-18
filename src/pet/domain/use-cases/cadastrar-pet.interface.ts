import { IUseCase } from '@core/use-case.interface';

import { CreatePetEntityProps } from '../entities/pet.entity';

export type CadastrarPetUseCaseInput = CreatePetEntityProps;
export type CadastrarPetUseCaseOutput = CreatePetEntityProps & { id: string };

export type ICadastrarPetUseCase = IUseCase<
  CadastrarPetUseCaseInput,
  CadastrarPetUseCaseOutput
>;
