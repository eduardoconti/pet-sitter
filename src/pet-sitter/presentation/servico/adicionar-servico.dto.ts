import { IsEnum, IsNotEmpty } from 'class-validator';

import { TipoServicoEnum } from '@servico/domain/enums';

export class AdicionarServicoDto {
  @IsNotEmpty({ message: 'Tipo servico obrigatorio' })
  @IsEnum(TipoServicoEnum, {
    message: `Servico aceita os valores ${Object.values(TipoServicoEnum)}`,
  })
  tipoServico!: TipoServicoEnum;
}
