import { BaseModel } from '@core/base-model';

import { TutorModel } from '@tutor/domain/models';

import { PetSitterModel } from './pet-sitter.model';

export class AvaliacaoModel extends BaseModel<number> {
  idPetSitter!: number;
  idTutor!: number;
  rating!: number;
  descricao?: string;
  petSitter?: PetSitterModel;
  tutor?: TutorModel;
}
