import { Transform } from 'class-transformer';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class ExibirPerfilParams {
  @Transform(({ value }) => Number(value))
  @IsPositive({ message: 'Id invalido' })
  @IsNotEmpty({ message: 'Id obrigatorio' })
  id!: number;
}
