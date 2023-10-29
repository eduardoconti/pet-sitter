import { IUseCase } from '@core/use-case.interface';
import { PetEntity, PetEntityProps } from '../entities/pet.entity';

export type CadastrarPetUseCaseInput = Omit<PetEntity, 'id'>;
export type CadastrarPetUseCaseOutput = PetEntityProps;

export type ICadastrarPetUseCase = IUseCase<
  CadastrarPetUseCaseInput,
  CadastrarPetUseCaseOutput
>;
