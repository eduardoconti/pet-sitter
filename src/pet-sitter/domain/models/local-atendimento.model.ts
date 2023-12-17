import { BaseModel } from '@core/base-model';

export type LocalAtendimentoModel = BaseModel & {
  idRegiao: number;
  idCidade: number;
  raioAtendimento: number;
};
