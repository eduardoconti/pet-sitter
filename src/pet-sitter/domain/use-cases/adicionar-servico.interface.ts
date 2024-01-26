import { IUseCase } from '@core/use-case.interface';
import { TipoServicoEnum } from '@servico/domain/enums';

export type AdicionarServicoUseCaseInput = {
  idUsuario: string;
  tipoServico: TipoServicoEnum;
};

export interface IAdicionarServicoUseCase
  extends IUseCase<AdicionarServicoUseCaseInput, void> {}
