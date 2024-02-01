import {
  Usuario,
  UsuarioProps,
  IPerfilUsuario,
} from '@usuario/domain/entities';
import { PerfilUsuarioEnum, StatusUsuario } from '@usuario/domain/enums';

import { Avaliacao } from './avaliacao.entity';
import { LocalAtendimento } from './local-atendimento';

export type PetSitterProps = UsuarioProps & {
  localAtendimento: LocalAtendimento[];
  idPetSitter: number;
  bio?: string;
  avaliacoes?: Avaliacao[];
};

export type CreatePetSitterEntityProps = Omit<
  PetSitterProps,
  'localAtendimento'
>;

export class PetSitter extends Usuario implements IPerfilUsuario {
  private _localAtendimento!: LocalAtendimento[];
  private _idPetSitter!: number | undefined;
  private _bio?: string;
  private _avaliacoes?: Avaliacao[];

  constructor({
    nome,
    dataNascimento,
    id,
    email,
    senha,
    petSitter,
    sobreNome,
    status,
    bio,
    avaliacoes,
  }: Omit<CreatePetSitterEntityProps, 'idPetSitter'>) {
    super({ nome, dataNascimento, id, email, senha, sobreNome, status });
    this._idPetSitter = petSitter?.id;
    this._bio = bio;
    this._avaliacoes = avaliacoes;
  }
  get idPetSitter(): number {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this._idPetSitter!;
  }

  get idUsuario() {
    return this.id;
  }

  get bio() {
    return this._bio;
  }

  get avaliacoes() {
    return this._avaliacoes;
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
  }: Omit<
    CreatePetSitterEntityProps,
    'id' | 'idPetSitter' | 'status'
  >): PetSitter {
    return new PetSitter({
      nome,
      dataNascimento,
      contato,
      email,
      senha,
      sobreNome,
      status: StatusUsuario.PENDENTE_ATIVACAO,
    });
  }

  perfil(): PerfilUsuarioEnum {
    return PerfilUsuarioEnum.PET_SITTER;
  }

  idPerfil(): number {
    return this._idPetSitter as number;
  }
}
