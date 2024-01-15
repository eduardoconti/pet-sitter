import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class AdicionarLocalAtendimentoDto {
  @IsNumber(
    { allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'Id cidade invalido' },
  )
  @IsNotEmpty({ message: 'Id cidade obrigatorio' })
  idCidade!: number;

  @IsNumber({}, { message: 'Id cidade invalido' })
  @IsOptional()
  idRegiaoAtendimento?: number;

  @IsNumber({}, { message: 'Id cidade invalido' })
  @IsOptional()
  raioAtendimento?: number;
}
