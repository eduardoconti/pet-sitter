import { BaseModel } from '@core/base-model';

import { TemperamentoPetEnum } from '../enums';

export class PetModel extends BaseModel {
  nome!: string;
  temperamento!: TemperamentoPetEnum;
}
