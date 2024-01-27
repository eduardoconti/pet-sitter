import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsISO8601, IsNotEmpty, IsString } from 'class-validator';
export class PreCadastroPetSitterDto {
  @ApiProperty()
  @IsString({ message: 'Nome invalido' })
  @IsNotEmpty({ message: 'Nome obrigatorio' })
  nome!: string;

  @ApiProperty()
  @IsString({ message: 'Sobrenome invalido' })
  @IsNotEmpty({ message: 'Sobrenome obrigatorio' })
  sobreNome!: string;

  @ApiProperty()
  @IsISO8601({}, { message: 'Data nascimento invalida' })
  @IsNotEmpty({ message: 'Data nascimento obrigatoria' })
  dataNascimento!: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email obrigatorio' })
  @IsEmail({}, { message: 'Email invalido' })
  email!: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Senha obrigatoria' })
  @IsString({ message: 'Senha invalida' })
  senha!: string;
}
