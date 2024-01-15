import { BaseModel } from '@core/base-model';

import { CidadeModel } from '@localizacao/domain/models';

import { PetSitterModel } from './pet-sitter.model';

export class LocalAtendimentoModel extends BaseModel {
  idCidade!: number;
  idPetSitter!: number;
  idRegiao?: number | null;
  raioAtendimento?: number | null;
  petSitter?: PetSitterModel;
  cidade?: CidadeModel;
}
