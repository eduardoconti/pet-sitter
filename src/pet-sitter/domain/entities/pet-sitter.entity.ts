import { Contato, Pessoa, PessoaProps } from '@pessoa/domain/entities';

import { PetSitterModel } from '../models';

export type PetSitterProps = PessoaProps;

export class PetSitter extends Pessoa {
  private constructor({ nome, dataNascimento, id }: PetSitterProps) {
    super({ nome, dataNascimento, id });
  }

  static fromModel({
    contato,
    dataNascimento,
    id,
    nome,
  }: PetSitterModel): PetSitter {
    const petSitter = new PetSitter({ dataNascimento, id, nome });

    if (contato) {
      petSitter.contato = Contato.fromModel(contato);
    }

    return petSitter;
  }
}
