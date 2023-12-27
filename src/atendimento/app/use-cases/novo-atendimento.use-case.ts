import { Atendimento } from '@atendimento/domain/entities';
import { IAtendimentoRepository } from '@atendimento/domain/repositories';
import {
  INovoAtendimentoUseCase,
  NovoAtendimentoUseCaseOutput,
} from '@atendimento/domain/use-cases';

export class NovoAtendimentoUseCase implements INovoAtendimentoUseCase {
  constructor(private readonly repository: IAtendimentoRepository) {}
  async executar(): Promise<NovoAtendimentoUseCaseOutput> {
    const atendimento = Atendimento.novo();
    const saved = await this.repository.save({
      status: atendimento.status,
    });

    return await Promise.resolve({ id: saved.id });
  }
}
