import { PetSitterModel } from '@pet-sitter/domain/models';

import { BaseModel } from '@core/base-model';

import { TipoServicoEnum } from '../enums';

export abstract class ServicoModel extends BaseModel {
  idPetSitter!: number;
  tipoServico!: TipoServicoEnum;
  petSitter?: PetSitterModel;
}
