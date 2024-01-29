import { BaseModel } from '@core/base-model';

import { UsuarioModel } from '@usuario/models';

export class TutorModel extends BaseModel<number> {
  idUsuario!: string;
  usuario!: UsuarioModel;
}
