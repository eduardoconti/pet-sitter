import { IsNotEmpty, IsString, Max } from 'class-validator';

export class PreCadastroPetSitterDto {
  @IsString({ message: 'Nome invalido' })
  @IsNotEmpty({ message: 'Nome obrigatorio' })
  @Max(128)
  nome!: string;

  @IsString({ message: 'Data nascimento invalida' })
  @IsNotEmpty({ message: 'Data nascimento obrigatoria' })
  dataNascimento!: Date;

  @IsNotEmpty({ message: 'Email obrigatorio' })
  @IsString({ message: 'Email invalido' })
  @Max(256)
  email!: string;

  @IsNotEmpty({ message: 'Senha obrigatoria' })
  @IsString({ message: 'Senha invalida' })
  @Max(128)
  senha!: string;
}
