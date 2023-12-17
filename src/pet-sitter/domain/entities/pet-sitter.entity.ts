import { Contato, Pessoa, PessoaProps } from '@pessoa/domain/entities';

import { PetSitterModel } from '../models';
import { LocalAtendimento } from './local-atendimento';

export type PetSitterProps = PessoaProps & {
  localAtendimento: LocalAtendimento;
};

export class PetSitter extends Pessoa {
  private _localAtendimento!: LocalAtendimento;

  private constructor({
    nome,
    dataNascimento,
    id,
  }: Omit<PetSitterProps, 'localAtendimento'>) {
    super({ nome, dataNascimento, id });
  }

  get localAtendimento(): LocalAtendimento {
    return this._localAtendimento;
  }

  set localAtendimento(localAtendimento: LocalAtendimento) {
    this._localAtendimento = localAtendimento;
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
}
