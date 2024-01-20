import { IsNotEmpty } from 'class-validator';

import { TipoServicoEnum } from '@servico/domain/enums';

export class AdicionarServicoDto {
  // @IsEnum(
  //   { allowNaN: false, maxDecimalPlaces: 0 },
  //   { message: 'Tipo servico invalido' },
  // )
  @IsNotEmpty({ message: 'Tipo servico obrigatorio' })
  tipoServico!: TipoServicoEnum;
}
