import { LocalAtendimentoModel } from '../models';

export interface ILocalAtendimentoRepository {
  save(
    model: Omit<LocalAtendimentoModel, 'dataInclusao' | 'id'>,
  ): Promise<LocalAtendimentoModel>;
}
