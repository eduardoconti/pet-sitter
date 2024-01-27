import { LocalAtendimentoModel } from '@pet-sitter/domain/models';

import { BaseModel } from '@core/base-model';

import { EstadoModel } from './estado.model';

export class CidadeModel extends BaseModel<number> {
  nome!: string;
  idEstado!: number;
  estado!: EstadoModel;
  localAtendimento?: LocalAtendimentoModel[];
}
