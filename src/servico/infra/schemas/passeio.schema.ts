import { EntitySchema } from 'typeorm';

import { PasseioModel } from '@servico/domain/models';

export const PasseioSchema = new EntitySchema<PasseioModel>({
  name: 'PasseioModel',
  tableName: 'tb_passeio',
  target: PasseioModel,
  columns: {
    id: {
      name: 'id',
      primary: true,
      type: Number,
      generated: 'increment',
      primaryKeyConstraintName: 'pk_tb_passeio',
    },
    tipoServico: {
      name: 'tipo_servico',
      type: 'char',
    },
    idPetSitter: {
      name: 'id_pet_sitter',
      type: Number,
    },
    dataInclusao: {
      name: 'data_inclusao',
      type: 'timestamp with time zone',
    },
  },
  relations: {
    petSitter: {
      type: 'many-to-one',
      target: 'PetSitterModel',
      joinColumn: {
        foreignKeyConstraintName: 'fk_tb_passeio_tb_pet_sitter',
        name: 'id_pet_sitter',
      },
      inverseSide: 'servicoPasseio',
    },
  },
  uniques: [
    {
      columns: ['idPetSitter'],
      name: 'uq_tb_passeio_id_pet_sitter',
    },
  ],
  checks: [
    {
      name: 'ck_tb_passeio',
      expression: '"tipo_servico" = \'P\'',
    },
  ],
});
