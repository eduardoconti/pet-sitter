import { PetSitterModel } from '../models';

export interface IPetSitterRepository {
  save(
    model: Omit<PetSitterModel, 'dataInclusao' | 'id'>,
  ): Promise<PetSitterModel>;
}
