import { PetModel } from '../models';

export interface IPetRepository {
  save(model: Omit<PetModel, 'dataInclusao'>): Promise<PetModel>;
}
