import { INovoAtendimentoUseCase } from '@atendimento/domain/use-cases';

export class NovoAtendimentoUseCase implements INovoAtendimentoUseCase {
  async executar(input: string): Promise<string> {
    return await Promise.resolve(input);
  }
}
