import { PetEntity } from '@pet/domain/entities';

import { Centavos } from '@core/contracts';
import { UUID } from '@core/uuid.value-object';
import { Intervalo } from '@core/value-objects';

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
    id?: UUID;
    periodos: Intervalo[];
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

  get periodos(): Intervalo[] {
    return this._periodos;
  }

  static create({
    periodos,
    servico,
    pet,
  }: {
    periodos: Intervalo[];
    servico: Alimentacao;
    pet: PetEntity;
  }) {
    return new SolicitacaoAlimentacao({
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
