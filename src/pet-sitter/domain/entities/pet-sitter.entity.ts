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
  }: Omit<CreatePetSitterEntityProps, 'idPetSitter'> & {
    idPetSitter?: number;
  }) {
    super({ nome, dataNascimento, id, email, senha });
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
  }: Omit<CreatePetSitterEntityProps, 'id' | 'idPetSitter'>): PetSitter {
    return new PetSitter({ nome, dataNascimento, contato, email, senha });
  }

  // static override fromModel({
  //   usuario: { contato, dataNascimento, nome, email, senha },
  //   id,
  //   localAtendimento,
  // }: PetSitterModel): PetSitter {
  //   const petSitter = new PetSitter({ dataNascimento, id, nome, email, senha });

  //   if (contato) {
  //     petSitter.contato = Contato.fromModel(contato);
  //   }

  //   if (localAtendimento) {
  //     petSitter.localAtendimento = localAtendimento.map((e) =>
  //       LocalAtendimento.create(e),
  //     );
  //   }

  //   return petSitter;
  // }

  // static toModel(entity: PetSitter): Omit<PetSitterModel, 'dataInclusao'> {
  //   return {
  //     id: entity.id,
  //     idUsuario: entity.nome,
  //     dataNascimento: entity.dataNascimento,
  //     email: entity.email,
  //     senha: entity.senha,
  //     idPetSitter: entity.idPetSitter,
  //   };
  // }
}
