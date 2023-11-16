import { randomUUID } from 'crypto';
import { PetModel } from '../models';
import { Entity } from '@core/entity';
import { TemperamentoPetEnum } from '../enums/temperamento.enum';

export type PetEntityProps = Omit<PetModel, 'dataInclusao'>;

export class PetEntity extends Entity {
  private _nome!: string;
  private _temperamento!: TemperamentoPetEnum;

  private constructor({ nome, id, temperamento }: PetEntityProps) {
    super({ id });
    this._nome = nome;
    this._temperamento = temperamento;
  }

  get nome(): string {
    return this._nome;
  }

  get temepramento(): TemperamentoPetEnum {
    return this._temperamento;
  }

  static create({ nome, temperamento }: Omit<PetEntityProps, 'id'>): PetEntity {
    return new PetEntity({ id: randomUUID(), nome, temperamento });
  }

  static toModel(pet: PetEntity): Omit<PetModel, 'dataInclusao'> {
    return {
      id: pet.id,
      nome: pet.nome,
      temperamento: pet.temepramento,
    };
  }

  static fromModel(pet: PetModel): PetEntity {
    return new PetEntity(pet);
  }
}
