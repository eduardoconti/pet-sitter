import { Centavos } from '@core/contracts';
import { Entity } from '@core/entity';
import { UUID } from '@core/uuid.value-object';
import { Periodo } from '@core/value-objects';
import { PetEntity } from '@pet/domain/entities';
import { Alimentacao, Passeio, Servico } from '@servico/domain/entities';

type DiaAtendimento = {
  dia: Date;
  periodo: Periodo[];
};
export class ServicoPet extends Entity {
  private _servico!: Servico;
  private _pet!: PetEntity;
  private _idAtendimento!: UUID;
  private _diasAtendimento!: DiaAtendimento[];

  private constructor({
    id,
    diasAtendimento,
    servico,
    pet,
  }: {
    id: UUID;
    diasAtendimento: DiaAtendimento[];
    servico: Servico;
    pet: PetEntity;
  }) {
    super({ id: id.value });
    this._diasAtendimento = diasAtendimento;
    this._servico = servico;
    this._pet = pet;
  }

  get servico(): Servico {
    return this._servico;
  }

  get pet(): PetEntity {
    return this._pet;
  }

  get idAgendamento(): UUID {
    return this._idAtendimento;
  }

  get diasAtendimento(): DiaAtendimento[] {
    return this._diasAtendimento;
  }

  static create({
    diasAtendimento,
    servico,
    pet,
  }: {
    diasAtendimento: DiaAtendimento[];
    servico: Servico;
    pet: PetEntity;
  }) {
    return new ServicoPet({
      id: UUID.generate(),
      diasAtendimento,
      servico,
      pet,
    });
  }

  valorServico(): Centavos {
    if (this.servico instanceof Passeio) {
      let horas = 0;

      this.diasAtendimento.forEach((item) => {
        horas += item.periodo.reduce((acc, item) => {
          return (acc += item.horas);
        }, 0);
      });
      return this.servico.calcularValor(horas);
    }

    if (this.servico instanceof Alimentacao) {
      let frequencia = 0;
      this.diasAtendimento.forEach((diaAtendimento) => {
        frequencia += diaAtendimento.periodo.length;
      });
      return this.servico.calcularValor(frequencia);
    }
    return 0;
  }
}
