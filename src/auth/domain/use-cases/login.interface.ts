import { IUseCase } from '@core/use-case.interface';

export type LoginInput = {
  email: string;
  senha: string;
};
export type ILoginUseCase = IUseCase<LoginInput, string>;
