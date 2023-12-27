import { BaseModel } from '@core/base-model';

export class LocalAtendimentoModel extends BaseModel {
  idRegiao!: number;
  idCidade!: number;
  raioAtendimento!: number;
}
