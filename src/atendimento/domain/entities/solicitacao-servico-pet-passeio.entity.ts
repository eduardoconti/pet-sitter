import { Centavos } from '@core/contracts';
import { UUID } from '@core/uuid.value-object';
import { PetEntity } from '@pet/domain/entities';
import { Passeio } from '@servico/domain/entities';

import { DiaAtendimento } from '../value-objects';
import { SolicitacaoServicoPet } from './solicitacao-servico-pet.entity';

export class SolicitacaoPasseio extends SolicitacaoServicoPet {
  protected _servico!: Passeio;

  constructor({
    id,
    diasAtendimento,
    servico,
    pet,
  }: {
    id: UUID;
    diasAtendimento: DiaAtendimento[];
    servico: Passeio;
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
    servico: Passeio;
    pet: PetEntity;
  }) {
    return new SolicitacaoPasseio({
      id: UUID.generate(),
      diasAtendimento,
      servico,
      pet,
    });
  }

  valorServico(): Centavos {
    let horas = 0;

    this.diasAtendimento.forEach((diaAtendimento) => {
      horas += diaAtendimento.periodos.reduce((acc, periodo) => {
        return (acc += periodo.horasEntrePeriodo());
      }, 0);
    });
    return this.servico.valor() * horas;
  }
}
