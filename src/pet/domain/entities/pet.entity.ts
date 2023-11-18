import { Entity } from '@core/entity';
import { UUID } from '@core/uuid.value-object';

import { PetModel } from '../models';
import { NomePet, TemperamentoPet } from '../value-objects';

export type CreatePetEntityProps = Omit<PetModel, 'dataInclusao' | 'id'>;

export class PetEntity extends Entity {
  private _nome!: NomePet;
  private _temperamento!: TemperamentoPet;

  private constructor({
    nome,
    id,
    temperamento,
  }: {
    id: UUID;
    nome: NomePet;
    temperamento: TemperamentoPet;
  }) {
    super({ id: id.value });
    this._nome = nome;
    this._temperamento = temperamento;
  }

  get nome(): NomePet {
    return this._nome;
  }

  get temepramento(): TemperamentoPet {
    return this._temperamento;
  }

  static create({ nome, temperamento }: CreatePetEntityProps): PetEntity {
    return new PetEntity({
      id: UUID.generate(),
      nome: NomePet.create(nome),
      temperamento: TemperamentoPet.create(temperamento),
    });
  }

  static toModel(pet: PetEntity): Omit<PetModel, 'dataInclusao'> {
    return {
      id: pet.id,
      nome: pet.nome.value,
      temperamento: pet.temepramento.value,
    };
  }

  static fromModel({ id, nome, temperamento }: PetModel): PetEntity {
    return new PetEntity({
      id: UUID.create(id),
      nome: NomePet.create(nome),
      temperamento: TemperamentoPet.create(temperamento),
    });
  }
}
