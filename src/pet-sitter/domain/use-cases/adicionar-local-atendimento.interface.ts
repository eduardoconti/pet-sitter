import { IUseCase } from '@core/use-case.interface';

export type AdicionarLocalAtendimentoUseCaseInput = {
  idCidade: number;
  idUsuario: string;
  idRegiao?: number;
};

export type IAdicionarLocalAtendimentoUseCase = IUseCase<
  AdicionarLocalAtendimentoUseCaseInput,
  void
>;
