import { Usuario, UsuarioProps } from '@usuario/domain/entities';

import { LocalAtendimento } from './local-atendimento';

export type PetSitterProps = UsuarioProps & {
  localAtendimento: LocalAtendimento[];
  idPetSitter: number;
};

export type CreatePetSitterEntityProps = Omit<
  PetSitterProps,
  'localAtendimento'
>;

export class PetSitter extends Usuario {
  private _localAtendimento!: LocalAtendimento[];
  private _idPetSitter!: number | undefined;

  constructor({
    nome,
    dataNascimento,
    id,
    email,
    senha,
    idPetSitter,
    sobreNome,
  }: Omit<CreatePetSitterEntityProps, 'idPetSitter'> & {
    idPetSitter?: number;
  }) {
    super({ nome, dataNascimento, id, email, senha, sobreNome });
    this._idPetSitter = idPetSitter;
  }
  get idPetSitter(): number {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this._idPetSitter!;
  }

  get idUsuario() {
    return this.id;
  }

  get localAtendimento(): LocalAtendimento[] {
    return this._localAtendimento;
  }

  set localAtendimento(localAtendimento: LocalAtendimento[]) {
    this._localAtendimento = localAtendimento;
  }

  static preCadastro({
    nome,
    dataNascimento,
    contato,
    email,
    senha,
    sobreNome,
  }: Omit<CreatePetSitterEntityProps, 'id' | 'idPetSitter'>): PetSitter {
    return new PetSitter({
      nome,
      dataNascimento,
      contato,
      email,
      senha,
      sobreNome,
    });
  }
}
