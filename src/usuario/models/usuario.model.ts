import { PetSitterModel } from '@pet-sitter/domain/models';

import { BaseModel } from '@core/base-model';

import { StatusUsuario } from '@usuario/domain/enums';

import { TutorModel } from '@tutor/domain/models';

import { ContatoModel } from './contato.model';

export class UsuarioModel extends BaseModel {
  nome!: string;
  sobreNome!: string;
  dataNascimento!: Date | string | number;
  contato?: ContatoModel;
  email!: string;
  senha!: string;
  status!: StatusUsuario;
  petSitter?: PetSitterModel;
  tutor?: TutorModel;
}
