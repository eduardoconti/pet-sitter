import { ServicoModel } from '../models';

export interface IServicoRepository {
  save(model: Omit<ServicoModel, 'dataInclusao' | 'id'>): Promise<ServicoModel>;
}
