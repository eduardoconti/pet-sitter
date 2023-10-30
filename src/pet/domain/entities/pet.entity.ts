import { randomUUID } from 'crypto';
import { PetModel } from '../models';

export type PetEntityProps = {
  id: string;
  nome: string;
};

export class PetEntity {
  private _id!: string;
  private _nome!: string;

  constructor({ nome, id }: PetEntityProps) {
    this._id = id;
    this._nome = nome;
  }

  get id(): string {
    return this._id;
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
