import { BaseModel } from '@core/base-model';

import { EstadoModel } from './estado.model';

export class PaisModel extends BaseModel {
  nome!: string;
  estado?: EstadoModel[];
}
