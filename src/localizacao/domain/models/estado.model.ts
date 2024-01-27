import { BaseModel } from '@core/base-model';

import { CidadeModel } from './cidade.model';
import { PaisModel } from './pais.model';

export class EstadoModel extends BaseModel<number> {
  nome!: string;
  idPais!: number;
  pais?: PaisModel;
  cidade?: CidadeModel[];
}
