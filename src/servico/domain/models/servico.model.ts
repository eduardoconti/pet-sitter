import { BaseModel } from '@core/base-model';

import { TipoServicoEnum } from '../enums';

export class ServicoModel extends BaseModel {
  idPetSitter!: number;
  tipoServico!: TipoServicoEnum;
}
