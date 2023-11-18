import { BaseModel } from '@core/base-model';

import { TemperamentoPetEnum } from '../enums/temperamento.enum';

export type PetModel = BaseModel & {
  nome: string;
  temperamento: TemperamentoPetEnum;
};
