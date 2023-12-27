import { IUseCase } from '@core/use-case.interface';

export type NovoAtendimentoUseCaseOutput = {
  id: string;
};
export interface INovoAtendimentoUseCase
  extends IUseCase<string, NovoAtendimentoUseCaseOutput> {
  executar(): Promise<NovoAtendimentoUseCaseOutput>;
}
