import { BaseModel } from '@core/base-model';

import { StatusAtendimentoEnum } from '../enums';

export class SolicitacaoServicoModel extends BaseModel {
  idPet!: string;
  idAtendimento!: string;
  idServico!: string;
  periodos!: PeriodosSolicitacaoServicoModel[];
}
export class AtendimentoModel extends BaseModel {
  status!: StatusAtendimentoEnum;
  idTutor?: string;
  idPetSitter?: string;
  servicos?: SolicitacaoServicoModel[];
}

export class PeriodosSolicitacaoServicoModel extends BaseModel {
  idPet!: string;
  idSolicitacaoServico!: string;
  dataInicio!: Date;
  dataFim!: Date;
}
