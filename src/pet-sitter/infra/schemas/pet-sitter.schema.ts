import { EntitySchema } from 'typeorm';

import { PetSitterModel } from '@pet-sitter/domain/models';
export const PetSitterSchema = new EntitySchema<PetSitterModel>({
  name: 'PetSitterModel',
  tableName: 'tb_pet_sitter',
  target: PetSitterModel,
  columns: {
    id: {
      name: 'id',
      type: 'uuid',
      primary: true,
      primaryKeyConstraintName: 'pk_tb_pet_sitter',
      default: () => 'uuid_generate_v4()',
    },
    nome: {
      type: String,
      length: 128,
    },
    dataNascimento: {
      name: 'data_nascimento',
      type: 'timestamp with time zone',
    },
    dataInclusao: {
      name: 'data_inclusao',
      type: 'timestamp with time zone',
    },
  },
});
