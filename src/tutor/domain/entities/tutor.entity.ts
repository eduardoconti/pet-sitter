import {
  Usuario,
  IPerfilUsuario,
  UsuarioProps,
} from '@usuario/domain/entities';
import { PerfilUsuarioEnum } from '@usuario/domain/enums';
export type TutorProps = UsuarioProps & {
  idTutor: number;
};

export type CreateTutorEntityProps = TutorProps;

export class Tutor extends Usuario implements IPerfilUsuario {
  private _idTutor!: number;

  constructor({
    nome,
    dataNascimento,
    id,
    email,
    senha,
    sobreNome,
    status,
    tutor,
  }: Omit<CreateTutorEntityProps, 'idTutor'>) {
    super({ nome, dataNascimento, id, email, senha, sobreNome, status });
    this._idTutor = tutor?.id as number;
  }

  perfil(): PerfilUsuarioEnum {
    return PerfilUsuarioEnum.TUTOR;
  }

  idPerfil(): number {
    return this._idTutor;
  }
}
