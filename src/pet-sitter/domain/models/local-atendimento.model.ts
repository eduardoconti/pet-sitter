import { BaseModel } from '@core/base-model';

import { CidadeModel } from '@localizacao/domain/models';

import { PetSitterModel } from './pet-sitter.model';

export class LocalAtendimentoModel extends BaseModel<number> {
  idCidade!: number;
  idPetSitter!: number;
  idRegiao?: number | null;
  petSitter?: PetSitterModel;
  cidade!: CidadeModel;
}
