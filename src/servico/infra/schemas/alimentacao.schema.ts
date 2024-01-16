import { EntitySchema } from 'typeorm';

import { AlimentacaoModel } from '@servico/domain/models';

export const AlimentacaoSchema = new EntitySchema<AlimentacaoModel>({
  name: 'AlimentacaoModel',
  tableName: 'tb_alimentacao',
  target: AlimentacaoModel,
  columns: {
    id: {
      name: 'id',
      primary: true,
      type: Number,
      generated: 'increment',
      primaryKeyConstraintName: 'pk_tb_alimentacao',
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
        foreignKeyConstraintName: 'fk_tb_alimentacao_tb_pet_sitter',
        name: 'id_pet_sitter',
      },
      inverseSide: 'servicoAlimentacao',
    },
  },
  uniques: [
    {
      columns: ['idPetSitter'],
      name: 'uq_tb_alimentacao_id_pet_sitter',
    },
  ],
  checks: [
    {
      name: 'ck_tb_alimentacao',
      expression: '"tipo_servico" = \'A\'',
    },
  ],
});
