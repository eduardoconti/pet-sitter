import { Contato, Pessoa, PessoaProps } from '@pessoa/domain/entities';

import { PetSitterModel } from '../models';
import { LocalAtendimento } from './local-atendimento';

export type PetSitterProps = PessoaProps & {
  localAtendimento: LocalAtendimento;
};

export type CreatePetSitterEntityProps = Omit<
  PetSitterProps,
  'localAtendimento'
>;

export class PetSitter extends Pessoa {
  private _localAtendimento!: LocalAtendimento;

  private constructor({
    nome,
    dataNascimento,
    id,
  }: CreatePetSitterEntityProps) {
    super({ nome, dataNascimento, id });
  }

  get localAtendimento(): LocalAtendimento {
    return this._localAtendimento;
  }

  set localAtendimento(localAtendimento: LocalAtendimento) {
    this._localAtendimento = localAtendimento;
  }

  static create({
    nome,
    dataNascimento,
    contato,
  }: Omit<CreatePetSitterEntityProps, 'id'>): PetSitter {
    return new PetSitter({ nome, dataNascimento, contato });
  }

  static fromModel({
    contato,
    dataNascimento,
    id,
    nome,
    localAtendimento,
  }: PetSitterModel): PetSitter {
    const petSitter = new PetSitter({ dataNascimento, id, nome });

    if (contato) {
      petSitter.contato = Contato.fromModel(contato);
    }

    if (localAtendimento) {
      petSitter.localAtendimento = LocalAtendimento.create(localAtendimento);
    }

    return petSitter;
  }

  static toModel(entity: PetSitter): Omit<PetSitterModel, 'dataInclusao'> {
    return {
      id: entity.id,
      nome: entity.nome,
      dataNascimento: entity.dataNascimento,
    };
  }
}
