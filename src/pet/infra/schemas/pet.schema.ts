import { TemperamentoPetEnum } from '@pet/domain/enums/temperamento.enum';
import { PetModel } from '@pet/domain/models';
import { EntitySchema } from 'typeorm';
export const PetSchema = new EntitySchema<PetModel>({
  name: 'PetModel',
  tableName: 'tb_pet',
  columns: {
    id: {
      name: 'id',
      type: 'uuid',
      primary: true,
      primaryKeyConstraintName: 'pk_tb_pet',
    },
    nome: {
      type: String,
      name: 'nome',
      length: 128,
    },
    temperamento: {
      type: 'enum',
      enum: TemperamentoPetEnum,
    },
    dataInclusao: {
      name: 'data_inclusao',
      type: 'timestamp with time zone',
    },
  },
});
