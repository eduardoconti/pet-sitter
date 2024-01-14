import { BaseModel } from '@core/base-model';

import { PetSitterModel } from './pet-sitter.model';

export class LocalAtendimentoModel extends BaseModel {
  idRegiao!: number;
  idCidade!: number;
  idPetSitter!: number;
  raioAtendimento!: number;
  petSitter?: PetSitterModel;
}
