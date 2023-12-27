import { Centavos } from '@core/contracts';
import { UUID } from '@core/uuid.value-object';
import { Intervalo } from '@core/value-objects';
import { PetEntity } from '@pet/domain/entities';
import { Passeio } from '@servico/domain/entities';

import { SolicitacaoServicoPet } from './solicitacao-servico-pet.entity';

export class SolicitacaoPasseio extends SolicitacaoServicoPet {
  protected _servico!: Passeio;

  constructor({
    id,
    periodos,
    servico,
    pet,
  }: {
    id?: UUID;
    periodos: Intervalo[];
    servico: Passeio;
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
    servico: Passeio;
    pet: PetEntity;
  }) {
    return new SolicitacaoPasseio({
      periodos,
      servico,
      pet,
    });
  }

  valorServico(): Centavos {
    let horas = 0;

    this.periodos.forEach((periodo) => {
      horas += periodo.horasEntrePeriodo();
    });
    return this.servico.valor() * horas;
  }
}
