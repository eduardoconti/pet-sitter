import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsISO8601, IsString } from 'class-validator';

export class AtualizarCadastroPetSitterDto {
  @ApiPropertyOptional()
  @IsString({ message: 'Nome invalido' })
  nome?: string;

  @ApiPropertyOptional()
  @IsString({ message: 'Sobrenome invalido' })
  sobreNome?: string;

  @ApiPropertyOptional()
  @IsISO8601({}, { message: 'Data nascimento invalida' })
  dataNascimento?: Date;

  @ApiPropertyOptional()
  // @IsString({ message: 'Bio invalida' })
  bio?: string;
}
