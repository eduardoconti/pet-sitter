import { BaseModel } from '@core/base-model';

export type ContatoModel = BaseModel & {
  telefone: string;
  email: string;
};
