import { randomUUID } from 'crypto';
import { PetModel } from '../models';
import { Entity } from '@core/entity';

export type PetEntityProps = Omit<PetModel, 'dataInclusao'>;

export class PetEntity extends Entity {
  private _nome!: string;

  constructor({ nome, id }: PetEntityProps) {
    super({ id });
    this._nome = nome;
  }

  get nome(): string {
    return this._nome;
  }

  static create({ nome }: Omit<PetEntityProps, 'id'>): PetEntity {
    return new PetEntity({ id: randomUUID(), nome });
  }

  static toModel(pet: PetEntity): Omit<PetModel, 'dataInclusao'> {
    return {
      id: pet.id,
      nome: pet.nome,
    };
  }

  static fromModel(pet: PetModel): PetEntity {
    return new PetEntity(pet);
  }
}
