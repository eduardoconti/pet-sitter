import { BaseModel } from '@core/base-model';

import { CidadeModel } from './cidade.model';
import { PaisModel } from './pais.model';

export class EstadoModel extends BaseModel {
  nome!: string;
  idPais!: string;
  pais?: PaisModel;
  cidade?: CidadeModel[];
}