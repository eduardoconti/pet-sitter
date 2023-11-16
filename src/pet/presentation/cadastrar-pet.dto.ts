import { TemperamentoPetEnum } from '@pet/domain/enums/temperamento.enum';

export class CadastrarPetDto {
  nome!: string;
  temperamento!: TemperamentoPetEnum;
}
