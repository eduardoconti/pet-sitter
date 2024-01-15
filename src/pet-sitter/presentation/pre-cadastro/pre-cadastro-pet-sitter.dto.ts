import { IsEmail, IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class PreCadastroPetSitterDto {
  @IsString({ message: 'Nome invalido' })
  @IsNotEmpty({ message: 'Nome obrigatorio' })
  nome!: string;

  @IsISO8601({}, { message: 'Data nascimento invalida' })
  @IsNotEmpty({ message: 'Data nascimento obrigatoria' })
  dataNascimento!: Date;

  @IsNotEmpty({ message: 'Email obrigatorio' })
  @IsEmail({}, { message: 'Email invalido' })
  email!: string;

  @IsNotEmpty({ message: 'Senha obrigatoria' })
  @IsString({ message: 'Senha invalida' })
  senha!: string;
}
