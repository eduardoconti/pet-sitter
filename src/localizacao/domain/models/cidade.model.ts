import { BaseModel } from '@core/base-model';

import { EstadoModel } from './estado.model';

export class CidadeModel extends BaseModel {
  nome!: string;
  idEstado!: string;
  estado?: EstadoModel;
}
