import { UsuarioModel } from 'src/usuario/models';

import { TipoServicoEnum } from '../enums';

export class ServicoModel extends UsuarioModel {
  idPetSitter!: string;
  tipoServico!: TipoServicoEnum;
}
