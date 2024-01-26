import { IsNotEmpty, IsUUID } from 'class-validator';

export class AtivarCadastroParams {
  @IsUUID('4', { message: 'Id invalido' })
  @IsNotEmpty({ message: 'Id obrigatorio' })
  id!: string;
}
