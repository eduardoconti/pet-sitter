import { DiaAtendimento } from '@atendimento/domain/value-objects';
import { Entity } from '@core/entity';
import { UUID } from '@core/uuid.value-object';

type AgendaConstructorProps = {
  id: UUID;
  idPetSitter: UUID;
  ano: number;
  mes: number;
};

export class Agenda extends Entity {
  private _idPetSitter!: UUID;
  private _ano!: number;
  private _mes!: number;

  constructor({ id, idPetSitter, ano, mes }: AgendaConstructorProps) {
    super({ id: id.value });

    this._idPetSitter = idPetSitter;
    this._ano = ano;
    this._mes = mes;
  }

  get idPetSitter() {
    return this._idPetSitter;
  }

  get ano(): number {
    return this._ano;
  }

  get mes(): number {
    return this._mes;
  }

  // static create({
  //   ano,
  //   mes,
  //   dia,
  //   idPetSitter,
  // }: Omit<AgendaConstructorProps, 'id'>): Agenda {
  //   return new Agenda({
  //     id: UUID.generate(),
  //     idPetSitter,
  //     ano,
  //     mes,
  //     dia,
  //   });
  // }

  // static novaAgenda() {
  //   const anoAtual = Data.numeroAno();
  //   const mesAtual = Data.numeroMes();
  //   const diaAtual = Data.numeroDia();
  // }
}

type DiaConstructorProps = {
  dia: DiaAtendimento;
  id: UUID;
  disponivel: boolean;
};

export class DiaAgenda extends Entity {
  private _dia!: DiaAtendimento;
  private _disponivel!: boolean;
  private constructor({ id, dia, disponivel }: DiaConstructorProps) {
    super({ id: id.value });
    this._dia = dia;
    this._disponivel = disponivel;
  }

  get dia() {
    return this._dia;
  }

  get disponivel() {
    return this._disponivel;
  }

  // static create({
  //   ano,
  //   mes,
  //   dia,
  //   idPetSitter,
  // }: Omit<AgendaConstructorProps, 'id'>): Agenda {
  //   return new Agenda({
  //     id: UUID.generate(),
  //     idPetSitter,
  //     ano,
  //     mes,
  //     dia,
  //   });
  // }

  // static novaAgenda() {
  //   const anoAtual = Data.numeroAno();
  //   const mesAtual = Data.numeroMes();
  //   const diaAtual = Data.numeroDia();
  // }
}
