import { TemperamentoPetEnum } from '../enums/temperamento.enum';

export interface PetModel {
  id: string;
  nome: string;
  dataInclusao: Date | number | string;
  temperamento: TemperamentoPetEnum;
}
