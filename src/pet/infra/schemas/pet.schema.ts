import { EntitySchema } from 'typeorm';

import { TemperamentoPetEnum } from '@pet/domain/enums';
import { PetModel } from '@pet/domain/models';
export const PetSchema = new EntitySchema<PetModel>({
  name: 'PetModel',
  tableName: 'tb_pet',
  target: PetModel,
  columns: {
    id: {
      name: 'id',
      type: 'uuid',
      primary: true,
      primaryKeyConstraintName: 'pk_tb_pet',
      default: () => 'uuid_generate_v4()',
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
