import { IUseCase } from '@core/use-case.interface';
import { PetEntityProps } from '../entities/pet.entity';

export type CadastrarPetUseCaseInput = Omit<PetEntityProps, 'id'>;
export type CadastrarPetUseCaseOutput = PetEntityProps;

export type ICadastrarPetUseCase = IUseCase<
  CadastrarPetUseCaseInput,
  CadastrarPetUseCaseOutput
>;
