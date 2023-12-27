import { AtendimentoModel } from '../models';

export interface IAtendimentoRepository {
  save(
    model: Omit<AtendimentoModel, 'dataInclusao' | 'id'>,
  ): Promise<AtendimentoModel>;
}
