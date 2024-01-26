import { BaseModel } from '@core/base-model';
import { PetSitterModel } from './pet-sitter.model';
import { TutorModel } from '@tutor/domain/models';

export class AvaliacaoModel extends BaseModel<number> {
  idPetSitter!: number;
  idTutor!: number;
  rating!: number;
  descricao?: string;
  petSitter?: PetSitterModel;
  tutor?: TutorModel;
}
