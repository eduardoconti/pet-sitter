import { Centavos } from '@core/contracts';
import { UUID } from '@core/uuid.value-object';
import { Periodo } from '@core/value-objects';
import { PetEntity } from '@pet/domain/entities';
import { Alimentacao } from '@servico/domain/entities';

import { SolicitacaoServicoPet } from './solicitacao-servico-pet.entity';

export class SolicitacaoAlimentacao extends SolicitacaoServicoPet {
  protected _servico!: Alimentacao;

  constructor({
    id,
    periodos,
    servico,
    pet,
  }: {
    id: UUID;
    periodos: Periodo[];
    servico: Alimentacao;
    pet: PetEntity;
  }) {
    super({
      id,
      periodos,
      servico,
      pet,
    });
  }

  static create({
    periodos,
    servico,
    pet,
  }: {
    periodos: Periodo[];
    servico: Alimentacao;
    pet: PetEntity;
  }) {
    return new SolicitacaoAlimentacao({
      id: UUID.generate(),
      periodos,
      servico,
      pet,
    });
  }

  valorServico(): Centavos {
    const frequencia = this.periodos.length;

    return this.servico.valor() * frequencia;
  }
}
