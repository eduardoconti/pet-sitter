import { PetSitterModel } from '@pet-sitter/domain/models';

import { BaseModel } from '@core/base-model';

import { ContatoModel } from './contato.model';

export abstract class UsuarioModel extends BaseModel {
  nome!: string;
  dataNascimento!: Date | string | number;
  contato?: ContatoModel;
  email!: string;
  senha!: string;
  petSitter?: PetSitterModel;
}