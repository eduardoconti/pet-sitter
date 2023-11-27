import { Centavos } from '@core/contracts';
import { UUID } from '@core/uuid.value-object';
import { PetEntity } from '@pet/domain/entities';
import { Alimentacao } from '@servico/domain/entities';

import { DiaAtendimento } from '../value-objects';
import { SolicitacaoServicoPet } from './solicitacao-servico-pet.entity';

export class SolicitacaoAlimentacao extends SolicitacaoServicoPet {
  protected _servico!: Alimentacao;

  constructor({
    id,
    diasAtendimento,
    servico,
    pet,
  }: {
    id: UUID;
    diasAtendimento: DiaAtendimento[];
    servico: Alimentacao;
    pet: PetEntity;
  }) {
    super({
      id,
      diasAtendimento,
      servico,
      pet,
    });
  }

  static create({
    diasAtendimento,
    servico,
    pet,
  }: {
    diasAtendimento: DiaAtendimento[];
    servico: Alimentacao;
    pet: PetEntity;
  }) {
    return new SolicitacaoAlimentacao({
      id: UUID.generate(),
      diasAtendimento,
      servico,
      pet,
    });
  }

  valorServico(): Centavos {
    let frequencia = 0;
    this.diasAtendimento.forEach((diaAtendimento) => {
      frequencia += diaAtendimento.periodos.length;
    });
    return this.servico.valor() * frequencia;
  }
}
