import { PessoaModel } from '@pessoa/models';

import { TipoServicoEnum } from '../enums';

export class ServicoModel extends PessoaModel {
  idPetSitter!: string;
  tipoServico!: TipoServicoEnum;
}
