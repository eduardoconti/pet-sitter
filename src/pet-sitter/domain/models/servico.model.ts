import { BaseModel } from '@core/base-model';

import { TipoServicoEnum } from '@servico/domain/enums';

import { PetSitterModel } from './pet-sitter.model';

export class ServicoModel extends BaseModel<number> {
  tipoServico!: TipoServicoEnum;
  idPetSitter!: number;
  petSitter?: PetSitterModel;
}
