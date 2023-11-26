import { Centavos } from '@core/contracts';
import { UUID } from '@core/uuid.value-object';
import { PetEntity } from '@pet/domain/entities';
import { Passeio } from '@servico/domain/entities';

import { DiaAtendimento, ServicoPet } from './servico-pet.entity';

export class ServicoPetPasseio extends ServicoPet {
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
    return new ServicoPetPasseio({
      id: UUID.generate(),
      diasAtendimento,
      servico,
      pet,
    });
  }

  valorServico(): Centavos {
    let horas = 0;

    this.diasAtendimento.forEach((diaAtendimento) => {
      horas += diaAtendimento.periodo.reduce((acc, periodo) => {
        return (acc += periodo.horasEntrePeriodo());
      }, 0);
    });
    return this.servico.valor() * horas;
  }
}
