import { IUseCase } from '@core/use-case.interface';

import { TipoServicoEnum } from '@servico/domain/enums';

export type AdicionarServicoUseCaseInput = {
  idUsuario: string;
  tipoServico: TipoServicoEnum;
};

export type IAdicionarServicoUseCase = IUseCase<
  AdicionarServicoUseCaseInput,
  void
>;
